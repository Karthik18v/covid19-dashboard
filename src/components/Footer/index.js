import {VscGithubAlt} from 'react-icons/vsc'
import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h2>
      Covid<span>India</span>
    </h2>
    <p>we stand with everyone fighting on the front lines</p>
    <div className="icons">
      <VscGithubAlt className="icon" />
      <FaTwitter className="icon" />
      <FiInstagram className="icon" />
    </div>
  </div>
)

export default Footer
