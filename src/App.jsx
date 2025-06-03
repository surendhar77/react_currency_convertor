// App.jsx
import { useState } from "react";
import { currencyConverter } from "./api/postApi"; // make sure this returns an object like { data: { conversion_result: 74.32 } }

const App = () => {
  const [amount, setAmount] = useState(0); // Amount to convert
  const [fromCurrency, setFromCurrency] = useState("USD"); // Base currency
  const [toCurrency, setToCurrency] = useState("INR"); // Target currency
  const [convertedAmount, setConvertedAmount] = useState(null); // Converted value
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleConvertCurrency = async () => {
    setLoading(true);
    setError(null);

    try {
      // Suppose currencyConverter returns a Promise resolving to { data: { conversion_result: number } }
      const res = await currencyConverter(fromCurrency, toCurrency, amount);
      const { conversion_result } = res.data;

      setConvertedAmount(conversion_result);
    } catch (err) {
      setError("Error fetching conversion rate");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>

        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="0"
            />
          </label>
        </div>

        <div className="currency-selector">
          <div>
            <label>
              From:
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {["USD", "EUR", "INR", "GBP", "AUD"].map((code) => (
                  <option
                    key={code}
                    value={code}
                    style={{
                      fontWeight: fromCurrency === code ? "bold" : "normal",
                    }}
                  >
                    {code}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label>
              To:
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {["INR", "USD", "EUR", "GBP", "AUD"].map((code) => (
                  <option
                    key={code}
                    value={code}
                    style={{
                      fontWeight: toCurrency === code ? "bold" : "normal",
                    }}
                  >
                    {code}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <button
          disabled={loading || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {loading ? "Converting…" : "Convert"}
        </button>

        <hr />

        {convertedAmount !== null && (
          <div className="result">
            <h2>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}{" "}
              {toCurrency}
            </h2>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </section>
  );
};

export default App;
