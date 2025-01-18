import {Component} from 'react'
import {IoSearch} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import Header from '../Header'
import Stats from '../Stats'
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

class Home extends Component {
  state = {
    stateWiseData: [],
    loading: true,
  }

  componentDidMount() {
    this.getDetails()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = response => {
    const resultList = []
    const keyNames = Object.keys(response)
    keyNames.forEach(keyName => {
      if (response[keyName]) {
        const {total} = response[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = response[keyName].meta.population
          ? response[keyName].meta.population
          : 0
        const stateMatch = statesList.find(
          state => state.state_code === keyName,
        )
        const stateName = stateMatch ? stateMatch.state_name : 'Unknown State'

        resultList.push({
          stateCode: keyName,
          stateName,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  getDetails = async () => {
    const {stateWiseData} = this.state
    console.log(stateWiseData)
    const fetchedData = await fetch(
      'https://apis.ccbp.in/covid19-state-wise-data',
    )
    const response = await fetchedData.json()
    console.log(response)
    const data = this.convertObjectsDataIntoListItemsUsingForInMethod(response)
    this.setState({stateWiseData: data, loading: false})
  }

  renderLoaderView = () => (
    <div>
      <Loader type="CradleLoader" />
    </div>
  )

  render() {
    const {stateWiseData, loading} = this.state
    const totalConfirms = stateWiseData.reduce(
      (accumalator, eachState) => accumalator + eachState.confirmed,
      0,
    )
    const totalDeceased = stateWiseData.reduce(
      (accumalator, eachState) => accumalator + eachState.deceased,
      0,
    )
    const totalRecovered = stateWiseData.reduce(
      (accumalator, eachState) => accumalator + eachState.recovered,
      0,
    )
    const totalActive = totalConfirms - totalRecovered

    console.log(totalConfirms)
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
      <div className="home-container">
        <Header />
        {!loading ? (
          <>
            <div className="main">
              <div className="search-bar">
                <IoSearch size="20" />
                <input
                  className="search-input"
                  type="text"
                  placeholder="Enter state"
                />
              </div>
            </div>
            <Stats caseDetails={caseDetails} />
            <table
              border="1"
              style={{
                width: '1146px',
                height: '2080px',
                textAlign: 'left',
                marginLeft: '150px',
                borderRadius: '15px',
              }}
            >
              <thead>
                <tr>
                  <th>States/UT</th>
                  <th>Confirmed</th>
                  <th>Active</th>
                  <th>Recovered</th>
                  <th>Deceased</th>
                  <th>Population</th>
                </tr>
              </thead>
              <tbody>
                {stateWiseData.map(eachState => (
                  <tr className="table-row">
                    <td className="table-state-name">
                      <Link
                        to={`/state/${eachState.stateCode}`}
                        style={{textDecoration: 'none', color: 'white'}}
                      >
                        {eachState.stateName}
                      </Link>
                    </td>
                    <td className="confirmed-cases">{eachState.confirmed}</td>
                    <td className="active-cases">{eachState.active}</td>
                    <td className="recovered-cases">{eachState.recovered}</td>
                    <td className="deceased-cases">{eachState.deceased}</td>
                    <td className="population">{eachState.population}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Footer />
          </>
        ) : (
          <div className="loader-container">
            <Loader
              className="loader"
              type="Oval"
              color="white"
              height={60}
              width={50}
            />
          </div>
        )}
      </div>
    )
  }
}

export default Home
