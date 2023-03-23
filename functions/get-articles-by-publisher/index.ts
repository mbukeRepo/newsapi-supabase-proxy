import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const axios = axiod;

serve(async (req) => {
  const apiKey = new URL(req.url).searchParams.get("apiKey");
  let page = new URL(req.url).searchParams.get("page");
  const publisher = new URL(req.url).searchParams.get("sources");
  if (!page) {
    page = "1";
  }

  const { data } = await axios.get(
    `https://newsapi.org/v2/top-headlines?page=${page}&sources=${publisher}&page=${page}&pageSize=15&apiKey=${apiKey}`
  );
  console.log(data);
  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
});
