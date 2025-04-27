import { NavLink } from 'react-router-dom';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

const CountryList = ({ dataCountries, prevLocation }) => {
  return (
    <Grid>
      {dataCountries.map(({ id, country, flag }) => (
        <GridItem key={id}>
          <NavLink state={{ from: prevLocation }} to={`/country/${id}`}>
            <img src={flag} alt={country} />
          </NavLink>
        </GridItem>
      ))}
    </Grid>
  );
};
export default CountryList;
