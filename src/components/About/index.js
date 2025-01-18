import {Component} from 'react'
import Header from '../Header'
import './index.css'

class About extends Component {
  state = {
    faqsData: [],
    factoidsData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    this.setState({
      factoidsData: data.factoids,
      faqsData: data.faq,
    })
  }

  render() {
    const {faqsData, factoidsData} = this.state
    return (
      <div>
        <Header />
        <div className="about-container">
          <h1>About</h1>
          <p className="update-date">Last update on march 28th 2021.</p>
          <p className="sub-heading">
            COVID-19 vaccines be ready for distribution
          </p>
          <h3>Faqs</h3>
          {faqsData.map(each => (
            <div>
              <p className="question">{each.question}</p>
              <p className="answer">{each.answer}</p>
            </div>
          ))}
          <h3>Factoids</h3>
          {factoidsData.map(each => (
            <p className="question">{each.banner}</p>
          ))}
        </div>
      </div>
    )
  }
}

export default About
