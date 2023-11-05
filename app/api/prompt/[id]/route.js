import Prompt from "@models/prompt";
import { ConnectToDB } from "@utils/database";

export const GET=async(request,{params})=>{
    try {
        await ConnectToDB();
        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found",{status:404})
        return new Response(JSON.stringify(prompt),{status:200})
    } catch (error) {
        return new Response("Failed to fetch all prompts",{status:500})
    }
}

export const PATCH= async(request,{params})=>{
    const{prompt,tag}=await request.json();

    try {
        await ConnectToDB();
        const existingPrompt=await Prompt.findById(params.id)
        if(!existingPrompt) return new Response ("prompt not found",{status:404})
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();

        return new Response("Successfully updated",{status:200})
    } catch (error) {
        return new Response ("Failed to update prompt",{status:500})
    }
}

export const DELETE=async(request,{params})=>{
    try {
       await ConnectToDB();
       await Prompt.findByIdAndRemove(params.id);
       return new Response("Prompt deleted suceessfully",{status:200})

    } catch (error) {
        return new Response("failed to delete Prompt",{status:500})
        
    }
}