import React from 'react';
import { Link } from 'react-router-dom';

import { Text } from '../../components';

const fourZeroFour = () => (
  <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Text h2 primaryColor>
      We couldn't find that vote <span role="img" aria-label="Sad Face">😔</span>
    </Text>
    <Text h4>
      Try re-checking your link or <Link to={"/"}>creating a new vote</Link>.
    </Text>
  </main>
);

export default fourZeroFour;
