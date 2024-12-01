CREATE OR REPLACE FUNCTION add_jungle_coins(amount INTEGER, reason TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  wallet_id UUID;
BEGIN
  -- Get the wallet ID for the current user
  SELECT id INTO wallet_id
  FROM jungle_wallet
  WHERE profile_id = auth.uid();

  -- Update wallet balance
  UPDATE jungle_wallet
  SET balance = balance + amount
  WHERE id = wallet_id;

  -- Record transaction
  INSERT INTO wallet_transactions (wallet_id, amount, type, description)
  VALUES (wallet_id, amount, 'credit', reason);
END;
$$;