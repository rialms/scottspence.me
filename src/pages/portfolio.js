import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import SEO from 'react-seo-component'
import styled from 'styled-components'
import Layout from '../components/layout'
import { ProjectCard } from '../components/projectCard'
import { ShinyButton } from '../components/shared'
import TopLanguages from '../components/topLanguages'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
// import { Dump } from '../util/helpers'
import { media } from '../theme/sizes'

const ProjectWrapper = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  ${media.giant`
    grid-template-columns: repeat(2, 1fr);
  `};
  ${media.desktop`
    grid-template-columns: repeat(2, 1fr);
  `};
  ${media.tablet`
    grid-template-columns: repeat(1, 1fr);
  `};
  ${media.phone`
    grid-template-columns: repeat(1, 1fr);
  `};
`

const PortfolioPage = ({ data }) => {
  const { assets } = data.graphcmsdata
  const {
    description,
    imageLink,
    title,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
    lastBuildDate
  } = useSiteMetadata()
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const builtDate = new Date(lastBuildDate).toLocaleDateString(
    siteLanguage,
    options
  )
  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        image={`${siteUrl}${imageLink}`}
        pathname={siteUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />
      {/* <Dump assets={assets} /> */}
      <h1>Portfolio</h1>
      <h2>Top 5 Languages used:</h2>
      <p>
        Here&#39;s my top 5 languages being used calculated from my
        GitHub commits.
      </p>
      <p>
        This chart is updated every time this site is built, last
        build date was {builtDate}
      </p>
      <TopLanguages />
      <h2>Projects:</h2>
      <p>List of projects here.</p>
      <ProjectWrapper>
        {assets.map(project => {
          const {
            projectName,
            projectDescription,
            githubRepo,
            demoLink
          } = project.projectImageProject[0]
          const { url: image, id } = project
          return (
            // <Dump prop={project.projectImageProject[0].projectName} />
            <ProjectCard
              key={id}
              name={projectName}
              desc={projectDescription}
              github={githubRepo}
              demo={demoLink}
              image={image}
            />
          )
        })}
      </ProjectWrapper>

      <p>
        <Link to="/">
          <ShinyButton>homepage</ShinyButton>
        </Link>
      </p>
    </Layout>
  )
}

export const query = graphql`
  {
    graphcmsdata {
      assets(orderBy: createdAt_DESC) {
        createdAt
        updatedAt
        mimeType
        url
        size
        width
        status
        handle
        fileName
        height
        id
        projectImageProject {
          createdAt
          updatedAt
          status
          id
          projectName
          projectDescription
          githubRepo
          demoLink
        }
      }
    }
  }
`

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired
}

export default PortfolioPage
