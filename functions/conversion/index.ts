import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";

const openai = new OpenAI(
  "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"
);
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const convertToNext = async (inputFile: string) => {
  let text =
    "Change the following vue.js(nuxt.js) code to react.js(typescript)";
  text += inputFile;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 1500,
    prompt: text,
    temperature: 0.01,
  });

  return completion.data.choices[0].text;
};

serve(async (req) => {
  console.log(req);
  const { code } = await req.json();
  console.log(code);
  convertToNext(code).then((data) => {
    return new Response(JSON.stringify({ name: data }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  });
});
