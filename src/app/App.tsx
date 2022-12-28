import React from 'react';
import Navigation from '~/app/Navigation';
import AgreementService from '~/services/AgreementService/Agreement.service';
import ApiService from '~/services/ApiSevice/Api.service';
import SocketIOService from '~/services/SocketIOService/SocketIO.service';

const App = () => {
  AgreementService();
  ApiService();
  SocketIOService();

  return <Navigation />;
};

export default App;
