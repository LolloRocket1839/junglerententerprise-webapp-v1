-- Create enum for user types (only if not exists)
DO $$ BEGIN
    CREATE TYPE user_type AS ENUM ('investor', 'student', 'tourist');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create enum for KYC status (only if not exists)
DO $$ BEGIN
    CREATE TYPE kyc_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create enum for contract types (only if not exists)
DO $$ BEGIN
    CREATE TYPE contract_type AS ENUM ('rental', 'investment', 'management');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create enum for transaction types (only if not exists)
DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('investment', 'rental_payment', 'dividend', 'fee', 'deposit', 'withdrawal');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update profiles table to include user type and KYC info
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS user_type user_type DEFAULT 'student',
ADD COLUMN IF NOT EXISTS kyc_status kyc_status DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS documento_identita TEXT,
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS tax_code TEXT;

-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  indirizzo TEXT NOT NULL,
  citta TEXT NOT NULL,
  cap TEXT,
  prezzo_acquisto DECIMAL(12,2) NOT NULL,
  valore_corrente DECIMAL(12,2),
  stato property_status DEFAULT 'available',
  numero_stanze INTEGER NOT NULL,
  numero_bagni INTEGER DEFAULT 1,
  superficie_mq INTEGER,
  descrizione TEXT,
  immagini TEXT[],
  rendimento_annuo DECIMAL(5,2),
  spese_gestione DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create SFP tokens table for fractional ownership
CREATE TABLE IF NOT EXISTS public.sfp_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  importo DECIMAL(12,2) NOT NULL,
  percentuale_proprieta DECIMAL(5,2) NOT NULL,
  data_emissione TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_scadenza TIMESTAMP WITH TIME ZONE,
  token_hash TEXT UNIQUE,
  stato TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contracts table
CREATE TABLE IF NOT EXISTS public.contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tipo contract_type NOT NULL,
  canone_mensile DECIMAL(10,2),
  deposito DECIMAL(10,2),
  data_inizio DATE NOT NULL,
  data_fine DATE NOT NULL,
  stato TEXT DEFAULT 'active',
  clausole_speciali TEXT,
  documenti TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tipo transaction_type NOT NULL,
  importo DECIMAL(12,2) NOT NULL,
  riferimento_id UUID,
  riferimento_tipo TEXT,
  descrizione TEXT,
  data_transazione TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  stato TEXT DEFAULT 'completed',
  commissioni DECIMAL(10,2) DEFAULT 0,
  metodo_pagamento TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sfp_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for properties
DROP POLICY IF EXISTS "Properties are viewable by everyone" ON public.properties;
CREATE POLICY "Properties are viewable by everyone" ON public.properties
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only investors can create properties" ON public.properties;
CREATE POLICY "Only investors can create properties" ON public.properties
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'investor')
  );

DROP POLICY IF EXISTS "Only property investors can update properties" ON public.properties;
CREATE POLICY "Only property investors can update properties" ON public.properties
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.sfp_tokens WHERE property_id = properties.id AND investor_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'investor')
  );

-- RLS Policies for SFP tokens
DROP POLICY IF EXISTS "Users can view their own tokens" ON public.sfp_tokens;
CREATE POLICY "Users can view their own tokens" ON public.sfp_tokens
  FOR SELECT USING (investor_id = auth.uid());

DROP POLICY IF EXISTS "Investors can create tokens" ON public.sfp_tokens;
CREATE POLICY "Investors can create tokens" ON public.sfp_tokens
  FOR INSERT WITH CHECK (
    investor_id = auth.uid() AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'investor')
  );

-- RLS Policies for contracts
DROP POLICY IF EXISTS "Users can view their own contracts" ON public.contracts;
CREATE POLICY "Users can view their own contracts" ON public.contracts
  FOR SELECT USING (
    tenant_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.sfp_tokens WHERE property_id = contracts.property_id AND investor_id = auth.uid())
  );

DROP POLICY IF EXISTS "Property owners can create contracts" ON public.contracts;
CREATE POLICY "Property owners can create contracts" ON public.contracts
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.sfp_tokens WHERE property_id = contracts.property_id AND investor_id = auth.uid())
  );

-- RLS Policies for transactions
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create their own transactions" ON public.transactions;
CREATE POLICY "Users can create their own transactions" ON public.transactions
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_stato ON public.properties(stato);
CREATE INDEX IF NOT EXISTS idx_properties_citta ON public.properties(citta);
CREATE INDEX IF NOT EXISTS idx_sfp_tokens_property ON public.sfp_tokens(property_id);
CREATE INDEX IF NOT EXISTS idx_sfp_tokens_investor ON public.sfp_tokens(investor_id);
CREATE INDEX IF NOT EXISTS idx_contracts_property ON public.contracts(property_id);
CREATE INDEX IF NOT EXISTS idx_contracts_tenant ON public.contracts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_tipo ON public.transactions(tipo);

-- Create triggers for updating timestamps
DROP TRIGGER IF EXISTS update_properties_updated_at ON public.properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contracts_updated_at ON public.contracts;
CREATE TRIGGER update_contracts_updated_at
  BEFORE UPDATE ON public.contracts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();