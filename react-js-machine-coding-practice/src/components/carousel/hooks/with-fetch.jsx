import { useEffect, useState } from "react";

const withFetch =
  (url, dataKey = undefined) =>
  (WrappedComponent) => {
    const FetchComponent = (props) => {
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetch(url);
          const jsonData = await res.json();
          setData(dataKey ? jsonData[dataKey] : jsonData);
        } catch (err) {
          console.log(err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);

      return (
        <WrappedComponent
          {...props}
          data={data}
          loading={loading}
          error={error}
        />
      );
    };

    return FetchComponent;
  };

export default withFetch;
