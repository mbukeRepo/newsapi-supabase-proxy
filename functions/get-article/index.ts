import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const axios = axiod;

serve(async (req) => {
  const apiKey = new URL(req.url).searchParams.get("apiKey");
  const articleId = new URL(req.url).searchParams.get("articleId");

  const { data } = await axios.get(
    `https://newsapi.org/v2/everything?q=${articleId}&apiKey=${apiKey}`
  );
  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json" },
  });
});
