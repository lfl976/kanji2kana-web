/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/qONSrohspQX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Arimo } from 'next/font/google'
import { Libre_Franklin } from 'next/font/google'

arimo({
  subsets: ['latin'],
  display: 'swap',
})

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

interface TranslateNode {
	surface: string;
	kana: string;
}

function hasChineseCharacter(text: string) {
	// 使用正则表达式检查文本中是否包含汉字
	return /[\u4e00-\u9fff]/.test(text);
}

function convertToRuby(data: TranslateNode[]) {
	let result = "";
	data.forEach((item) => {
		if (item.kana && hasChineseCharacter(item.surface)) {
			result += `<ruby>${item.surface}<rp>(</rp><rt>${item.kana}</rt><rp>)</rp></ruby>`;
		} else {
			result += item.surface;
		}
	});
	return result;
}

export function Component() {
	const [text, setText] = useState("");
	const [translatedList, setTranslatedList] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	async function translate() {
		// Add your translation logic here
		if (!text) return;
		const list = [];
		const arr = text.split("\n");

		console.log("Text to translate", arr);

		for (const item of arr) {
			setLoading(true);
			try {
				if (!item) continue;
				const params = new URLSearchParams({} as any);
				params.set("text", item);
				// const url = `http://127.0.0.1:5000//tokenize?${params.toString()}`;
				const gllgleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=${item}`;
				const url = `https://kanji2kana-service.vercel.app/tokenize?${params.toString()}`;
				const vercelUrl = `https://kanji2kana-service.vercel.app/tokenize?${params.toString()}`;

				const response = await fetch(
					location.href.includes("local") ? url : vercelUrl
				);
				const data = await response.json();
				console.log("Translated data", data);
				const result = convertToRuby(data);
				list.push(result);
			} catch (error) {
				console.error(error);
				break;
			} finally {
				setLoading(false);
			}
		}
		setTranslatedList([...translatedList, ...list]);
	}

	function playAudio() {
		// 创建一个新的SpeechSynthesisUtterance实例
		const utterance = new SpeechSynthesisUtterance(text);
		// 日语
		utterance.lang = "ja-JP";
		// 开始朗读
		speechSynthesis.speak(utterance);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					<LanguagesIcon className="h-6 w-6" />
					<h1 className="text-xl font-bold">Translate</h1>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="flex items-center gap-2" variant="ghost">
							<GlobeIcon className="h-5 w-5" />
							<span>EN</span>
							<ChevronDownIcon className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-40">
						<DropdownMenuLabel>Select Language</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<div className="flex items-center gap-2">
								<FlagIcon className="h-5 w-5" />
								<span>English</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<div className="flex items-center gap-2">
								<FlagIcon className="h-5 w-5" />
								<span>Español</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<div className="flex items-center gap-2">
								<FlagIcon className="h-5 w-5" />
								<span>Français</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<div className="flex items-center gap-2">
								<FlagIcon className="h-5 w-5" />
								<span>Deutsch</span>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
			<main className="flex-1 bg-gray-100 dark:bg-gray-900 py-12 px-6">
				<div className="max-w-2xl mx-auto space-y-8">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">Translate Text</h2>
						<p className="text-gray-500 dark:text-gray-400">
							Enter the text you want to translate below.
						</p>
					</div>
					<div className="space-y-4">
						<Textarea
							className="w-full rounded-md border border-gray-200 border-gray-300 bg-white p-3 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-gray-600 dark:focus:ring-gray-600 dark:border-gray-800"
							placeholder="Enter text to translate..."
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>
						<Button className="w-96" onClick={translate} disabled={loading}>
							Translate
						</Button>
						<Button className="ml-4" onClick={playAudio}>
							Audio
						</Button>
						<Button className="ml-4" onClick={() => setTranslatedList([])}>
							Clear
						</Button>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-bold">Translated Text</h2>
						<div className="rounded-md border border-gray-200 border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-800">
							{translatedList.map((item, index) => (
								<p
									key={index}
									className="text-xl leading-9"
									dangerouslySetInnerHTML={{
										__html: item || "The translated text will appear here.",
									}}
								></p>
							))}
						</div>
					</div>
				</div>
			</main>
			<footer className="bg-gray-900 text-white py-4 px-6 text-center">
				<p className="text-sm">© 2024 Translate. All rights reserved.</p>
			</footer>
		</div>
	);
}

function ChevronDownIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

function FlagIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
			<line x1="4" x2="4" y1="22" y2="15" />
		</svg>
	);
}

function GlobeIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
			<path d="M2 12h20" />
		</svg>
	);
}

function LanguagesIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m5 8 6 6" />
			<path d="m4 14 6-6 2-3" />
			<path d="M2 5h12" />
			<path d="M7 2h1" />
			<path d="m22 22-5-10-5 10" />
			<path d="M14 18h6" />
		</svg>
	);
}
