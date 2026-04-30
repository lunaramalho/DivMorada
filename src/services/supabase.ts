import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qrpfyselklaieprolcfn.supabase.co';
const supabaseKey = 'sb_publishable_caM1loYylm6t_KypVQJeXQ_WZgalbt-';

export const supabase = createClient(supabaseUrl, supabaseKey);