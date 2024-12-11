"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function addSnippet(
	formState: { message: string },
	formData: FormData,
) {
	try {
		// Get formData from form name properties
		const title = formData.get("title"); //as string
		const code = formData.get("code");

		if (typeof title !== "string" || title.length < 3) {
			return {
				message: "Title must be longer",
			};
		}
		if (typeof code !== "string" || code.length < 10) {
			return {
				message: "Code must be longer",
			};
		}

		// add a new record in the database
		const snippet = await db.snippet.create({
			data: {
				title,
				code,
			},
		});
		console.log("add a new snippet:", snippet);
		//throw new Error("database failed");
	} catch (err: unknown) {
		if (err instanceof Error) {
			return {
				message: err.message,
			};
		}
		return {
			message: "Something went wrong...",
		};
	}
	//Redirect the user back to the root route
	redirect("/"); //should be the last, else NEXT_REDIRECT
}

export async function updateSnippet(id: number, code: string) {
	await db.snippet.update({
		where: { id },
		data: { code },
	});
	console.log("updateSnippet()", id, code);
	redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
	await db.snippet.delete({
		where: { id },
	});
	console.log("deleteSnippet()", id);
	redirect("/");
}