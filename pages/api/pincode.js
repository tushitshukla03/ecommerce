export default function handler(req, res) {
    let pincodes = {
    "721301":["Kharagpur","West Bengal"],
    "110003":["Delhi","New Delhi"],
    "380001":["Ahmedabad","Gujarat"],
    "560017":["Bangalore","Karnataka"],
    "211001":["Prayagraj","Uttar Pradesh"],
    "462003":["Bhopal","Madhya Pradesh"],
    "208001":["Kanpur","Uttar Pradesh"],
    "800009": ["Patna City" , "Bihar"]

    }
    res.status(200).json(pincodes)
  }


  
  