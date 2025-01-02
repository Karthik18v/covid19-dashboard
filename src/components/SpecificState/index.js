import {Component} from 'react'
import Header from '../Header'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class SpecificState extends Component {
  state = {
    stateName: '',
    totalConfirms: 0,
    totalActive: 0,
    totalDeceased: 0,
    totalRecovered: 0,
    totalTested: 0,
    districts: [],
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    this.getStateDetails(stateCode)
    const name = statesList.find(state => state.state_code === stateCode)
      .state_name
    this.setState({stateName: name})
  }

  getStateDetails = async stateCode => {
    const fetchedData = await fetch(
      `https://apis.ccbp.in/covid19-state-wise-data`,
    )
    const response = await fetchedData.json()
    console.log(response)
    const {confirmed, deceased, recovered, tested} = response[stateCode].total
    const districts = Object.keys(response[stateCode].districts)
    console.log(districts)
    const active = confirmed - recovered
    this.setState({
      totalConfirms: confirmed,
      totalActive: active,
      totalRecovered: recovered,
      totalDeceased: deceased,
      totalTested: tested,
      districts,
    })
  }

  render() {
    const {
      stateName,
      totalConfirms,
      totalActive,
      totalDeceased,
      totalRecovered,
      totalTested,
      districts,
    } = this.state
    const caseDetails = [
      {
        id: 0,
        heading: 'Confirmed',
        imageUrl: 'https://i.imghippo.com/files/ZndV8710Oks.png',
        number: totalConfirms,
        color: '#FF073A',
      },
      {
        id: 1,
        heading: 'Active',
        imageUrl: 'https://i.imghippo.com/files/rCbe7377VU.png',
        number: totalActive,
        color: '#007BFF',
      },
      {
        id: 2,
        heading: 'Recovered',
        imageUrl: 'https://i.imghippo.com/files/OvUT8922ETc.png',
        number: totalRecovered,
        color: '#28A745',
      },
      {
        id: 3,
        heading: 'Deceased',
        imageUrl: 'https://i.imghippo.com/files/Sgro2647PC.png',
        number: totalDeceased,
        color: '#6C757D',
      },
    ]
    return (
      <div className="specific-state-container">
        <Header />
        <div className="state-container">
          <div className="state-header-container">
            <div>
              <h2 className="state-container-name">{stateName}</h2>
              <p>Last update on march 28th 2021.</p>
            </div>
            <div>
              <p>Tested</p>
              <p>{totalTested}</p>
            </div>
          </div>
        </div>
        <ul className="case-details-container">
          {caseDetails.map(each => (
            <li key={each.id} style={{color: each.color}}>
              <div className="case-details-items">
                <p className="case-details-heading">{each.heading}</p>
                <img
                  className="case-image"
                  src={each.imageUrl}
                  alt={each.heading}
                />
                <p className="case-details-number">{each.number}</p>
              </div>
            </li>
          ))}
        </ul>
        <h1 className="district-heading">Top Districts</h1>
        <ul className="districts-items">
          {districts.map(each => (
            <li key={each}>
              <div className="district-item">
                <p>77077</p>
                <p>{each}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default SpecificState
