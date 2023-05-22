import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import styles from './MainMenu.module.scss'

import { Linker } from '../links'
import { withTranslation } from '@polocas/ui/i18n'

export const MainMenu = withTranslation(({ t }) => (
  <Navbar bg="primary" collapseOnSelect expand="lg" sticky="top" variant="dark">
    <Container className={styles.menu}>
      <Linker route="home">
        <Navbar.Brand>{t('projectName')}</Navbar.Brand>
      </Linker>
      <Navbar.Toggle aria-controls="app-menu" />
      <Navbar.Collapse id="app-menu">
        <Nav>
          <Linker route="showList" activeProp="active">
            <Nav.Link>{t('shows')}</Nav.Link>
          </Linker>
          <Linker route="repertoir" activeProp="active">
            <Nav.Link>{t('repertoir')}</Nav.Link>
          </Linker>
          <Linker route="about" activeProp="active">
            <Nav.Link>{t('about')}</Nav.Link>
          </Linker>
          <Linker route="contact" activeProp="active">
            <Nav.Link>{t('contact')}</Nav.Link>
          </Linker>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
))
