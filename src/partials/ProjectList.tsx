import {
  ColorTags,
  GradientText,
  Project,
  Section,
  Tags,
} from 'astro-boilerplate-components';

const ProjectList = () => (
  <Section
    title={
      <>
        Recent <GradientText>Projects</GradientText>
      </>
    }
  >
    <div className="flex flex-col gap-6">
      <Project
        name="【Android】高仿京东商城app"
        description="高仿京东商城app安卓项目，集成React-Native热更功能"
        link="https://github.com/GuoguoDad/jd_mall"
        img={{
          src: '/assets/images/jdmall.jpeg',
          alt: 'jdmall',
        }}
        category={
          <>
            <Tags color={ColorTags.FUCHSIA}>Kotlin</Tags>
            <Tags color={ColorTags.SKY}>MVI</Tags>
            <Tags color={ColorTags.ROSE}>React Native</Tags>
          </>
        }
      />
      <Project
        name="webpack-plugin-mock"
        description="a webpack plugin for mock server interface."
        link="https://github.com/GuoguoDad/webpack-plugin-mock"
        img={{ src: '/assets/images/webpack.png', alt: 'webpack' }}
        category={
          <>
            <Tags color={ColorTags.VIOLET}>Webpack</Tags>
            <Tags color={ColorTags.EMERALD}>TypeScript</Tags>
            <Tags color={ColorTags.YELLOW}>Mockjs</Tags>
          </>
        }
      />
      <Project
        name="react-template-vite"
        description="vite3 react pc端 h5 项目模板."
        link="https://github.com/GuoguoDad/react-template-vite"
        img={{ src: '/assets/images/vite.png', alt: 'Project Maps' }}
        category={
          <>
            <Tags color={ColorTags.FUCHSIA}>Vite3</Tags>
            <Tags color={ColorTags.INDIGO}>React</Tags>
            <Tags color={ColorTags.ROSE}>Antd</Tags>
          </>
        }
      />
    </div>
  </Section>
);

export { ProjectList };
