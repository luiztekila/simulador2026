
const SUPABASE_URL = "https://hfwivmaijghzdmelaqjn.supabase.co";

const SUPABASE_KEY = "sb_publishable_0Sl1Sm1l8dXquG0SwtcRlw_ds5kKBz-";

console.log("window.supabase:", window.supabase);

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("Cliente:", supabaseClient);