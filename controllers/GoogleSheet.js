import React, { useState, useEffect } from 'react';

const Mongo_Mongo_Client = require('../helpers/dbconnection');
import { GoogleSpreadsheet } from 'google-spreadsheet';

const GoogleSheet = () => {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    const getSheetData = async () => {
      // Authenticate with Google Sheets API
      const doc = new GoogleSpreadsheet('14guFPD36OQF3Zc8xIFXSRx6C5gYz03p_ffhkDiJaAr0');
      await doc.useServiceAccountAuth({
        client_email: 'esforms-and-mongodb@esform-374409.iam.gserviceaccount.com',
        private_key: '58a95bba3e225135aa8f90261b2d2a76f41461a5'
      });
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();
      // Format sheet data into an array of objects
      const data = rows.map(row => ({
        column1: row.column1,
        column2: row.column2,
        column3: row.column3,
        column4: row.column4,
        column5: row.column5,
        column6: row.column6,
        column7: row.column7,
        column8: row.column8,
        column9: row.column9,
        column10: row.column10,
        column11: row.column11
      }));
      setSheetData(data);
    };
    getSheetData();
  }, []);

  useEffect(() => {
    const insertDataIntoMongoDB = async () => {
      // Connect to MongoDB
      await Mongo_Mongo_Client.connect();
      const db = client.db('esforms');
      const collection = db.collection('newusers');
      // Insert sheet data into MongoDB
      await collection.insertMany(sheetData);
      await client.close();
    };
    insertDataIntoMongoDB();
  }, [sheetData]);

  return (
    <div>
      <p>Data has been inserted into MongoDB!</p>
    </div>
  );
};

export default GoogleSheet;
