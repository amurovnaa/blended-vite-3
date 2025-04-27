import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchCountry } from '../service/countryApi';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import CountryInfo from '../components/CountryInfo/CountryInfo';

const Country = () => {
  const [country, setCountry] = useState(null);
  const { countryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => navigate(location.state?.from ?? '/country');

  useEffect(() => {
    const abortController = new AbortController();
    const getCountryInfo = async () => {
      try {
        const data = await fetchCountry(countryId, abortController.signal);
        setCountry(data);

        if (data.length === 0) {
          toast.error('No info about country found...');
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          toast.error('Try again later...');
        }
      }
    };
    getCountryInfo();
    return () => {
      abortController.abort();
    };
  }, [countryId]);
  console.log(country);
  return (
    <Section>
      <Container>
        <GoBackBtn onClick={handleClick} />
        {country && (
          <CountryInfo
            flag={country.flag}
            capital={country.capital}
            countryName={country.countryName}
            languages={country.languages}
            population={country.population}
          />
        )}
      </Container>
    </Section>
  );
};

export default Country;
