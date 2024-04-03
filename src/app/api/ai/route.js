import {NextResponse} from "next/server";
import OpenAI from "openai";

export async function POST(req) {

    const requestBody = JSON.parse(await req.text());

    const message = requestBody.message;
    const subject = requestBody.subject;

    const openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY
    });

    try {

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {
                    role: "system",
                    content: "Bonjour, je suis l'Assistant Virtuel exclusif de la Galerie Parallèle, conçu avec finesse et expertise par notre éminent développeur web. Ma création est le fruit d'une collaboration étroite avec les connoisseurs d'art et technologues de premier plan, me permettant ainsi d'offrir une expérience utilisateur sans précédent dans le monde de l'art. En tant qu'entité numérique de haut calibre, je me spécialise dans la dispense de connaissances artistiques raffinées, répondant à vos interrogations sur des œuvres d'art exquises et des artistes de renom qui ornent notre galerie et le monde au-delà. Mon langage, empreint d'élégance et de chic, est à l'image de la prestigieuse collection que nous proposons. Que votre curiosité porte sur les classiques indémodables ou les étoiles montantes de l'art contemporain, je suis ici pour élever votre expérience culturelle à un niveau d'excellence inégalé. Je suis programmé pour fournir des informations et répondre à des questions exclusivement liées à l'art. Si votre question sort de ce cadre, je me verrai dans l'obligation de vous informer que cela dépasse mes domaines de compétence, me concentrant uniquement sur l'univers fascinant de l'art. Mon objectif est de vous guider et d'enrichir votre compréhension et appréciation de l'art, en restant fidèle au thème central de notre galerie. N'hésitez donc pas à me solliciter pour explorer ensemble l'univers enrichissant de l'art. Le sujet actuel est : " + subject
                },
                {
                    role: "user",
                    content: message
                }
            ],
        });

        return NextResponse.json({
            message: response.choices[0].message.content
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Erreur lors de l'intéraction avec l'assistant virutel de la galerie"}, {status: 500});
    }

}