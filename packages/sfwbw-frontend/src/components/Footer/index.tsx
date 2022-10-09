import { ReactNode } from 'react';

const links = {
  profile: 'https://github.com/humodz',
  repository: 'https://github.com/humodz/sfwbw',
  issues: 'https://github.com/humodz/sfwbw/issues',
  discord: 'https://discord.gg/rPpWT2x',
};

export function Footer() {
  const A = ExternalLink;

  return (
    <footer>
      <p>
        By <A href={links.profile}>humodz</A>. Source code available{' '}
        <A href={links.repository}>on GitHub</A>.
      </p>
      <p>
        Problems? <A href={links.issues}>Open an issue</A> or get in contact via{' '}
        <A href={links.discord}>AWBW's Discord channel</A>.
      </p>
    </footer>
  );
}

interface ExternalLinkProps {
  href: string;
  children?: ReactNode;
}

function ExternalLink(props: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noreferrer" href={props.href}>
      {props.children}
    </a>
  );
}
