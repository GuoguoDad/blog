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
          I'm <GradientText>liuhui</GradientText> 👋 , frontend engineer, love
          fitness
        </>
      }
      description={
        <>
          👀 I'm currently focusing on web
          <br /> ⚙️ I use daily: `react`, `react-native`
          <br /> 🔭 I'm currently learning android
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
          <a target="_blank" href="https://blog.csdn.net/DuoguoDad">
            <img
              className="h-12 w-12 hover:translate-y-1"
              style={{ width: '5rem', height: '5rem' }}
              src="/assets/images/csdn.jpeg"
              alt="csdn icon"
              loading="lazy"
            />
          </a>
          <a target="_blank" href="https://juejin.cn/user/1636507895210350">
            <img
              className="h-12 w-12 hover:translate-y-1"
              style={{ width: '5rem', height: '5rem', marginLeft: '2rem' }}
              src="/assets/images/juejin.jpeg"
              alt="juejin icon"
              loading="lazy"
            />
          </a>
          <a target="_blank" href="https://codepen.io/GuoguoDad/pens/public">
            <img
              className="h-12 w-12 hover:translate-y-1"
              style={{ width: '5rem', height: '5rem', marginLeft: '2rem' }}
              src="/assets/images/codepen.jpeg"
              alt="codepen icon"
              loading="lazy"
            />
          </a>
        </>
      }
    />
  </Section>
);

export { Hero };
