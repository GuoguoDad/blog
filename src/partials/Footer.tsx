import { Section } from 'astro-boilerplate-components';

const Footer = () => (
  <Section>
    <div className="border-t border-gray-600 pt-5">
      <div className="text-sm text-gray-200">
        © Copyright 2022 by GuoguoDad. Built with ♥ by{' '}
        <a
          className="text-cyan-400 hover:underline"
          href="https://github.com/GuoguoDad"
          target="_blank"
          rel="noopener noreferrer"
        >
          LiuHui
        </a>
        .
      </div>
    </div>
  </Section>
);

export { Footer };
