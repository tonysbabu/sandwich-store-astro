import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get(context) {
	const posts = await getCollection('blog');
	return rss({
		title: 'Buzz’s Blog',
		description: 'A humble Astronaut’s guide to the stars',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			content: sanitizeHtml(parser.render(post.body)),
			link: `/blog/${post.slug}/`,
		})),
	});
}
