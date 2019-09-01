import App, { Container } from 'next/app'
import React, { Fragment } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import * as NProgress from 'nprogress/nprogress'
import { Layout, Menu, Icon } from 'antd'
import '../customize/styles.less'
import Router from 'next/router'
import { Row, Col } from 'antd'
const { Header, Content, Footer } = Layout
const viewBreakPoints = {
	tablet: 992,
	mobile: 768
}
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default class MyApp extends App<any> {

	state = {
		// for _app
		collapsed: true,
		siderAction: '',
		adminMode: false,
		windowWidth: undefined,
		printPDF: false,
		pageURL: '',
		// for siteNav
		navMode: 'horizontal' as any,
		navDisplay: 'block' as any,
		navBtnDisplay: 'none' as any,
		navBtnIcon: 'caret-down' as any,
		navClass: 'collapsed' as any,

		// error
		hasError: false
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.router.pathname == '/tour') {
			this.setState({
				printPDF: true
			})
		}
		else {
			this.setState({
				printPDF: false
			})
		}
	}
	componentDidMount() {
		this.checkWindowSize()
		window.addEventListener('resize', this.checkWindowSize)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.checkWindowSize)
	}
	checkWindowSize = () => {
		// web view
		window.innerWidth >= viewBreakPoints.tablet
			&& this.setState({ navMode: 'horizontal', navDisplay: 'block', navBtnDisplay: 'none' })
		// tablet view
		window.innerWidth < viewBreakPoints.tablet
			// && this.setState({navMode:'horizontal',navDisplay:'block',navBtnDisplay:'none'})
			&& (this.setState({ navMode: 'inline', navBtnDisplay: 'block' }),
				this.state.navBtnIcon == 'caret-down'
					? this.setState({ navDisplay: 'block', navClass: 'collapsed' })
					: this.setState({ navDisplay: 'block', navClass: 'collapsed open' })
			)
	}
	toggleNav = () => {
		this.state.navBtnIcon == 'caret-down'
			? this.setState({ navBtnIcon: 'caret-up', navDisplay: 'block', navClass: 'collapsed open' })
			: this.setState({ navBtnIcon: 'caret-down', navDisplay: 'block', navClass: 'collapsed' })
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true })
		// https://github.com/zeit/next.js/issues/5070
	}

	handleMenuClick() {
		this.state.navBtnIcon == 'caret-down'
			? this.setState({ navBtnIcon: 'caret-up', navDisplay: 'block', navClass: 'collapsed open' })
			: this.setState({ navBtnIcon: 'caret-down', navDisplay: 'block', navClass: 'collapsed' })
	}

	render() {
		const { Component, pageProps } = this.props

		return (
			<Container>
				{this.state.pageURL.includes("tour?id") ? "" :
					<Fragment>
						<meta name="description" content={`Li Yan - Weather Forecast`} />
						<meta name="keywords" content="Pilgrimage and Buddhist tours, tourist,leisure, travel,airfares, hotels, group tours, free and easy" />
						<meta property="og:title" content={`Li Yan - Weather Forecast`} />
						<meta property="og:description" content="To fulfill everyone’s travel dreams and expand your horizon of the world" />
						<meta property="og:image:type" content="image/jpeg" />
						<meta property="og:image:width" content="600" />
						<meta property="og:image:height" content="314" />
					</Fragment>
				}
				<Head>
					<meta name='viewport' content='width=device-width,initial-scale=1' />
					<meta charSet='utf-8' />
					<title>{`Li Yan - Weather Forecast`}</title>
					{/* favicons */}
					<link rel='icon' type='image/png' sizes='32x32' href='/static/favicon/favicon-32x32.png' />
					<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
					<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Sansita:700&display=swap" rel="stylesheet" />
					<link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
					<meta name='msapplication-TileColor' content='#2d89ef' />
					<meta name='theme-color' content='#ffffff' />
				</Head>
				<Layout hasSider={true} id={this.state.printPDF ? 'tour-page' : null}>
					<Layout className={this.state.collapsed === false && 'tc-dim-no-scroll-bars'} style={{ overflow: 'hidden' }}>
						<Header id='navi' style={{ width: '100%', height: 'auto', lineHeight: 1, padding: 'unset' }}>
							<p><a onClick={() => {
								Router.push('/about')
							}}
							>About Li Yan</a> <a onClick={() => Router.push('/about')}
							>Weather Forecast</a></p>
						</Header>
						<Content>
							{this.state.hasError
								? <div style={{ padding: '200px 0', textAlign: 'center', fontSize: '20px' }}><Icon type='warning' /> An error has occured</div>
								: <Component windowWidth={this.state.windowWidth} {...pageProps} />
							}
						</Content>
						<Footer id={'footer'}>
						<strong>{`Li Yan - Made in ReactJS / Typescript / Ant Design`} © {new Date().getFullYear()}</strong><br />
						</Footer>
					</Layout>
				</Layout>
			</Container>
		)
	}
}
