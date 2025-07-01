// const StudentJerseyPOS = require('../models/student_jersey_POS')


// exports.createStudentJersey = async (req, res) => {
//     try {
//         const data = {
//             school_location: ['AIROLI',
//                 'BALEWADI',
//                 'BELAPUR',
//                 'BHOPAL',
//                 'BORIVALI',
//                 'CHINCHWAD',
//                 'CHOKKANAHALLI',
//                 'COIMBATORE',
//                 'DODDANEKUNDI',
//                 'ECITY',
//                 'FURSUNGI',
//                 'GOREGAON',
//                 'GURUGRAM',
//                 'HARALUR',
//                 'HENNUR',
//                 'HINJEWADI',
//                 'HORAMAVU',
//                 'HSR LAYOUT',
//                 'INDORE',
//                 'JAKKUR',
//                 'KADUGODI',
//                 'KALYAN',
//                 'KHARGHAR',
//                 'KOLHAPUR',
//                 'LUCKNOW',
//                 'MAGARPATTA',
//                 'MALAD',
//                 'MALAD WEST',
//                 'MARAHTHAHALLI',
//                 'NAGPUR',
//                 'NASHIK',
//                 'NIBM',
//                 'PANATHUR',
//                 'PIMPALE SAUDAGAR',
//                 'SURAT',
//                 'VADODARA',
//                 'WAGHOLI',
//                 'YELAHANKA',
//                 'YERWADA',
//             ],
//             sports_team: [
//                 'Under 8 - Boys',
//                 'Under 8 - Girls',
//                 'Under 9 - Boys',
//                 'Under 9 - Girls',
//                 'Under 10 - Boys',
//                 'Under 10 - Girls',
//                 'Under 11 - Boys',
//                 'Under 11 - Girls',
//                 'Under 12 - Boys',
//                 'Under 12 - Girls',
//                 'Under 13 - Boys',
//                 'Under 13 - Girls',
//                 'Under 14 - Boys',
//                 'Under 14 - Girls',
//                 'Under 15 - Boys',
//                 'Under 15 - Girls',
//                 'Under 16 - Boys',
//                 'Under 16 - Girls',
//                 'Under 17 - Boys',
//                 'Under 17 - Girls',
//                 'Under 18 - Boys',
//                 'Under 18 - Girls',
//                 'Under 19 - Boys',
//                 'Under 19 - Girls'

//             ],
//             sports: [
//                 { name: 'FOOTBALL', golkeeper: true },
//                 { name: 'HANDBALL', golkeeper: false },
//                 { name: 'BASKETBALL', golkeeper: false },
//                 { name: 'CRICKET', golkeeper: false }

//             ],
//             tShirt_size: [
//                 '20',
//                 '22',
//                 '24',
//                 '26',
//                 '28',
//                 '30',
//                 '32',
//                 '34',
//                 '36',
//                 '38',
//                 '40',
//                 '42',
//                 '44',
//                 '46',
//                 '48',
//                 '50',
//                 '52',
//                 '54',


//             ],
//             pant_shorts_size: [
//                 '20',
//                 '22',
//                 '24',
//                 '26',
//                 '28',
//                 '30',
//                 '32',
//                 '34',
//                 '36',
//                 '38',
//                 '40',
//                 '42',
//                 '44',
//                 '46',
//                 '48',
//                 '50',
//                 '52',
//                 '54',


//             ]
//         }

//         // Create a new document
//         const newJersey = new StudentJerseyPOS(data);

//         // Save it to DB
//         const savedJersey = await newJersey.save();

//         res.status(200).json({
//             code: 200,
//             savedJersey
//         })

//     } catch (err) {
//         console.error('Error in deleteRequester:', err);
//         utils.handleError(res, err);
//     }
// }