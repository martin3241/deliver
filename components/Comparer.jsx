// import ReactHtmlParser from "react-html-parser";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import dynamic from "next/dynamic";

// Error: require() of ES Module C:\Users\Martin Muszynski\Desktop\JS projects\comparer\node_modules\d3-shape\src\index.js
// from C:\Users\Martin Muszynski\Desktop\JS projects\comparer\node_modules\recharts\lib\shape\Symbols.js not supported.
// Instead change the require of index.js in C:\Users\Martin Muszynski\Desktop\JS projects\comparer\node_modules\recharts\lib\shape\Symbols.js to
// a dynamic import() which is available in all CommonJS modules.

export default function Comparer() {
  // *** INPUT FIELD A***
  // Refactor showOptionsA / showOptionsB to be in one object: showOptions
  // showOptions: {
  //   a: {}
  //   b: {}
  // }
  // to reference showOptions a inner object
  // showOptions.A.name
  const [showOptionsA, setShowOptionsA] = useState(false);
  const [showOptionsB, setShowOptionsB] = useState(false);
  const [inputFieldAText, setInputFieldAText] = useState("");
  const [inputFieldBText, setInputFieldBText] = useState("");
  // Options dissapear when the user clicks outside A the options
  // useRef is a hook that allows us to directly access an html element
  const autocompleteRef = useRef(null);
  const [selectedObjectA, setSelectedObjectA] = useState(null);
  const [selectedObjectB, setSelectedObjectB] = useState(null);
  const [toggleAnswerBox, setToggleAnswerBox] = useState(false);
  const [urlForGraphAPI, setUrlForGraphAPI] = useState("");
  const [dataForGraph, setDataForGraph] = useState(null);
  const [historicData, setHistoricData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [days, setDays] = useState(1);
  const [optionsForInputA, setOptionsForInputA] = useState([]);
  const [optionsForInputB, setOptionsForInputB] = useState([]);
  const [timeSelection, setTimeSelection] = "24H";

  const clickOnListAOptionHandler = (newCurrencyValueA) => {
    setInputFieldAText(
      newCurrencyValueA.symbol.toUpperCase() +
        " - " +
        newCurrencyValueA.name +
        " - " +
        "$" +
        newCurrencyValueA.current_price
    );
    setShowOptionsA(false);
    setSelectedObjectA(newCurrencyValueA);
    toggle();
    setUrlForGraphAPI(
      "https://api.coingecko.com/api/v3/coins/" + newCurrencyValueA.id
    );
  };
  const clickOnListBOptionHandler = (newCurrencyValueB) => {
    setInputFieldBText(
      newCurrencyValueB.symbol.toUpperCase() +
        " - " +
        newCurrencyValueB.name +
        " - " +
        "$" +
        newCurrencyValueB.current_price
    );
    setShowOptionsB(false);
    setSelectedObjectB(newCurrencyValueB);
    toggle();
  };

  // GETTING DATA FOR THE GRAPH
  const HistoricChart = (id, days = 365) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;

  const clickOutsideHandler = (ev) => {
    // in the beginning our autocompleteRef is null so if the element is contained in the target, then I set the options to false
    if (
      autocompleteRef &&
      autocompleteRef.current &&
      // target is the element that triggered the event
      !autocompleteRef.current.contains(ev.target)
    ) {
      setShowOptionsA(false);
      setShowOptionsB(false);
    }
  };
  function inputFieldATextHandler(e) {
    setInputFieldAText(e.target.value);
  }
  function inputFieldBTextHandler(e) {
    setInputFieldBText(e.target.value);
  }
  function optionsAHandler() {
    setShowOptionsA(!showOptionsA);
    setShowOptionsA != null && setInputFieldAText("");
    setSelectedObjectA((prev) => {
      return { ...prev, image: null };
    });
    setToggleAnswerBox(false);
  }
  function optionsBHandler() {
    setShowOptionsB(!showOptionsB);
    selectedObjectB != null && setInputFieldBText("");
    setSelectedObjectB((prev) => {
      return { ...prev, image: null };
    });
    setToggleAnswerBox(false);
  }
  // I will start out by having an empty array that will be filled with the options
  //   This will launch the application only once the application loads
  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideHandler);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      // Once the data is pulled, we can set the data according to setOptionsForInputA
      .then(({ data }) => setOptionsForInputA(data))
      .catch((err) => console.error(err));

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then(({ data }) => setOptionsForInputB(data))
      .catch((err) => console.error(err));

    return () => {
      window.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  // GETTING DATA FOR THE GRAPH
  // useCallback is used to prevent rerendering on function change, only being calculated when a dependency is changed
  // Memoization
  const toggle = React.useCallback(
    function () {
      if (selectedObjectA !== null || selectedObjectB != null) {
        setToggleAnswerBox(true);
      } else {
        setToggleAnswerBox(false);
      }
    },
    [selectedObjectA]
  );

  useEffect(() => {
    toggleAnswerBox &&
      axios
        .get(urlForGraphAPI)
        .then(({ data }) => setDataForGraph(data))
        .catch((err) => console.error(err));
  }, [toggleAnswerBox]);

  useEffect(() => {
    dataForGraph !== null && fetchHistoricData();
  }, [dataForGraph]);

  useEffect(() => {
    historicData != null &&
      setFilteredData((prev) => {
        const currDt = new Date();
        // var yearDT = currDt.getFullYear();
        return historicData.filter((item) => {
          let itemDate = new Date(item.timestamp);
          if ((currDt - itemDate) / (1000 * 3600 * 24 * 365) < 1) return item;
        });
      });
  }, [historicData, timeSelection]);

  const fetchHistoricData = React.useCallback(async () => {
    const { data } = await axios.get(HistoricChart(dataForGraph?.id, 365));
    console.log(data);
    const priceData = data.prices;
    console.log("priceData:", priceData);
    setHistoricData(
      priceData.map((item, index) => {
        return {
          price: item[1],
          timestamp: new Date(item[0]).toISOString().substr(0, 10),
          // timestamp: new Date(item[0]).toISOString().substr(0, 19),
        };
      })
    );
  }, [dataForGraph]);

  function formatXAxis(tickItem) {
    // If using moment.js
    const dt = new Date(tickItem);
    const dateFormat = new Intl.DateTimeFormat("en", {
      year: "2-digit",
      month: "short",
      day: "numeric",
    });
    let dateTimeFormmated = dateFormat.format(dt);
    dateTimeFormmated = dateTimeFormmated.replace(",", "-", -1);
    let position = dateTimeFormmated.lastIndexOf(" ");
    return (
      dateTimeFormmated.substring(0, position) +
      "" +
      dateTimeFormmated.substring(position + 1)
    );
  }

  return (
    <div className="pb-10">
      <div id="whereAllTheStuffWillHappenDiv" className="px-10 pt-10  ">
        <h1 className="text-5xl pt-10 pb-2">Show the price of:</h1>
        <div className="p-4 flex justify-center" id="titlePlusInputField">
          {/* INPUT FIELD A HERE*/}
          <div className="bg-white w-64  relative overflow-visible ">
            {selectedObjectA !== null && selectedObjectA.image !== null && (
              <img
                src={`${selectedObjectA.image}`}
                className="align-middle w-7 z-10 h-7 absolute overflow-visible "
                alt=""
              />
            )}
            <input
              placeholder="Type here"
              onClick={optionsAHandler}
              value={inputFieldAText}
              // This will update the value with what is typed.
              onChange={inputFieldATextHandler}
              className="px-1 pl-10 py-1 placeholder-slate-300 text-slate-600  bg-whiterounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-64 relative"
            />
            <div className="bg-yellow-300 flex justify-center">
              {showOptionsA}
              {showOptionsA && (
                <ul
                  ref={autocompleteRef}
                  className="  bg-blue-300 divide-y divide-gray-100 rounded shadow max-h-96 dark:bg-gray-700 text-black overflow-auto scroll w-64"
                >
                  {optionsForInputA
                    //filter out the options that have the same letters as value
                    .filter(
                      (optA) =>
                        optA.name
                          .toLowerCase()
                          .indexOf(inputFieldAText.toLowerCase()) >= 0
                    )
                    .map((optA) => (
                      <li
                        key={optA.id}
                        onClick={() => clickOnListAOptionHandler(optA)}
                        className="px-4 py-2 place-self-start hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white text-s flex"
                      >
                        <img
                          src={optA.image}
                          alt="a crypto currency"
                          className="h-6 w-6 flex mr-6 place-self-auto"
                        />
                        {optA.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          {/* ARROWS */}
        </div>
        <div className="flex justify-center text-4xl pb-7 py-5">
          <h1>and compare it to the marketcap of:</h1>
        </div>
        <div className="p-4 flex justify-center" id="titlePlusInputField">
          {/* *** INPUT FIELD B HERE *** */}
          <div className="bg-white w-64  relative overflow-visible ">
            {selectedObjectB !== null && selectedObjectB.image !== null && (
              <img
                src={`${selectedObjectB.image}`}
                className="align-middle w-7 z-10 h-7 absolute overflow-visible "
                alt="crypto logo"
              />
            )}
            <input
              placeholder="Type here"
              onClick={optionsBHandler}
              value={inputFieldBText}
              onChange={inputFieldBTextHandler}
              className="px-1 pl-10 py-1 placeholder-slate-300 text-slate-600  bg-whiterounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-64 relative"
            />
            <div className="bg-yellow-300 flex justify-center">
              {showOptionsB && (
                <ul
                  ref={autocompleteRef}
                  className="  bg-blue-300 divide-y divide-gray-100 rounded shadow max-h-96 dark:bg-gray-700 text-black overflow-auto scroll w-64"
                >
                  {optionsForInputB
                    .filter(
                      (opt) =>
                        opt.name
                          .toLowerCase()
                          .indexOf(inputFieldBText.toLowerCase()) >= 0
                    )
                    .map((opt) => (
                      <li
                        key={opt.id}
                        onClick={() => clickOnListBOptionHandler(opt)}
                        className="px-4 py-2 place-self-start hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white text-s flex"
                      >
                        <img
                          src={opt.image}
                          alt="a crypto currency"
                          className="h-6 w-6 flex mr-6 place-self-auto"
                        />
                        {opt.name}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {toggleAnswerBox && selectedObjectA && selectedObjectB ? (
        <div className=" my-4 ">
          <div className="py-10 container mx-auto  ">
            <h2 className="">
              <span className="text-3xl">
                If <span className="text-5x1"> {selectedObjectA.name}</span> had
                the same market cap as {selectedObjectB.name}, its price would
                be $
                {(
                  selectedObjectB.market_cap /
                  selectedObjectA.circulating_supply
                ).toFixed(2)}
                ,
                <br /> meaning that it would{" "}
                {selectedObjectA.current_price <
                selectedObjectB.market_cap /
                  selectedObjectA.circulating_supply ? (
                  <span className="text-green-400">increase by</span>
                ) : (
                  <span className="text-red-400">decrease by</span>
                )}{" "}
                {selectedObjectA.current_price <
                selectedObjectB.market_cap / selectedObjectA.circulating_supply
                  ? (
                      (selectedObjectB.market_cap /
                        selectedObjectA.circulating_supply /
                        selectedObjectA.current_price) *
                      100
                    ).toFixed()
                  : (
                      ((selectedObjectA.current_price -
                        selectedObjectB.market_cap /
                          selectedObjectA.circulating_supply) /
                        selectedObjectA.current_price) *
                      100
                    ).toFixed()}
                %
              </span>
            </h2>
          </div>
          {/* GRAPH AREA */}
          <div className="py-10">
            {/* SIDEBAR */}
            <div className="flex justify-center ">
              <img
                src={dataForGraph?.image.large}
                alt={dataForGraph?.image.name}
                className="h-16 mx-4"
              />
              <h3 className="text-xl my-auto mx-4">{dataForGraph?.name}</h3>
              <p className="">
                {/* {ReactHtmlParser(dataForGraph?.description.en.split(". ")[0])}. */}
              </p>
              <div className="my-auto mx-4">
                <p>
                  <span className="text-lg">Rank: </span>{" "}
                  {dataForGraph?.market_cap_rank}
                </p>
              </div>
              <div className="my-auto mx-4">
                <p>
                  <span className="text-lg">Current Price: $</span>
                  {selectedObjectA.current_price !== null &&
                    selectedObjectA.current_price.toFixed(4)}
                </p>
              </div>
            </div>
            {/* THE GRAPH */}
            {/* Insert loading animation here later) */}
            <div className="graph-container">
              <ResponsiveContainer height={500} className="p-5">
                <AreaChart data={filteredData}>
                  <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#2451B7"
                        stopOpacity={0.4}
                      ></stop>
                      <stop
                        offset="75%"
                        stopColor="#2451B7"
                        stopOpacity={0.05}
                      ></stop>
                    </linearGradient>
                  </defs>
                  <Area dataKey="price" stroke="#2451B7" fill="url(#color)" />
                  <XAxis
                    dataKey="timestamp"
                    axisLine={false}
                    tickLine={true}
                    tickFormatter={formatXAxis}
                  />
                  <YAxis
                    dataKey="price"
                    axisLine={false}
                    tickLine={false}
                    tickCount={8}
                    tickFormatter={(number) => `$${number.toFixed(2)}`}
                  />
                  <Tooltip />
                  <CartesianGrid opacity={0.1} vertical={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
