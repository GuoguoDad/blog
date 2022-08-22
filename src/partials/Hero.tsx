import {
  GradientText,
  HeroAvatar,
  Section,
} from 'astro-boilerplate-components';

const Hero = () => (
  <Section>
    <HeroAvatar
      title={
        <>
          Hi there, I'm <GradientText>LiuHui</GradientText> 👋
        </>
      }
      description={
        <>
          👀 I'm currently focusing on web
          <br /> ⚙️ I use daily: `react`, `react-native`
          <br /> 🔭 I'm currently learning Android
          <br /> I ❤️ to think, learn, code, and fitness
        </>
      }
      avatar={
        <img
          className="h-80 w-64"
          src="/assets/images/avatar.svg"
          alt="Avatar image"
          loading="lazy"
        />
      }
      socialButtons={
        <>
          {/* <a href="/">
            <HeroSocial
              src="/assets/images/twitter-icon.png"
              alt="Twitter icon"
            />
          </a> */}
        </>
      }
    />
  </Section>
);

export { Hero };
