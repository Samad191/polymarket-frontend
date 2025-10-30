// @ts-nocheck
// @ts-ignore
"use client"


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface Trade {
  id: string
  outcome: string
  shares: number
  entryPrice: number
  currentPrice: number
  description: string
  timestamp: string
}

const staticTrades: Trade[] = [
  {
    id: "1",
    outcome: "Yes",
    shares: 100,
    entryPrice: 0.45,
    currentPrice: 0.62,
    description: "Bitcoin reaches $100k by EOY",
    timestamp: "2024-10-30T14:32:00Z",
  },
  {
    id: "2",
    outcome: "No",
    shares: 250,
    entryPrice: 0.55,
    currentPrice: 0.48,
    description: "Fed cuts rates in Q4",
    timestamp: "2024-10-30T13:15:00Z",
  },
  {
    id: "3",
    outcome: "Yes",
    shares: 150,
    entryPrice: 0.38,
    currentPrice: 0.71,
    description: "Trump wins 2024 election",
    timestamp: "2024-10-30T12:45:00Z",
  },
  {
    id: "4",
    outcome: "Yes",
    shares: 200,
    entryPrice: 0.52,
    currentPrice: 0.58,
    description: "S&P 500 hits new ATH",
    timestamp: "2024-10-30T11:20:00Z",
  },
  {
    id: "5",
    outcome: "No",
    shares: 180,
    entryPrice: 0.6,
    currentPrice: 0.42,
    description: "Recession declared in 2024",
    timestamp: "2024-10-30T10:05:00Z",
  },
  {
    id: "6",
    outcome: "Yes",
    shares: 120,
    entryPrice: 0.41,
    currentPrice: 0.65,
    description: "Ethereum ETF approval",
    timestamp: "2024-10-30T09:30:00Z",
  },
  {
    id: "7",
    outcome: "No",
    shares: 220,
    entryPrice: 0.58,
    currentPrice: 0.35,
    description: "Oil prices above $100/barrel",
    timestamp: "2024-10-29T16:45:00Z",
  },
  {
    id: "8",
    outcome: "Yes",
    shares: 90,
    entryPrice: 0.48,
    currentPrice: 0.73,
    description: "Apple stock splits again",
    timestamp: "2024-10-29T15:20:00Z",
  },
  {
    id: "9",
    outcome: "No",
    shares: 160,
    entryPrice: 0.62,
    currentPrice: 0.39,
    description: "Major tech layoffs announced",
    timestamp: "2024-10-29T14:10:00Z",
  },
  {
    id: "10",
    outcome: "Yes",
    shares: 140,
    entryPrice: 0.44,
    currentPrice: 0.68,
    description: "AI regulation passed",
    timestamp: "2024-10-29T13:00:00Z",
  },
]

export function PolymarketDashboard() {
  const totalTrades = staticTrades.length
  const totalVolume = staticTrades.reduce((sum, trade) => sum + trade.shares * trade.entryPrice, 0)
  const averagePrice = staticTrades.reduce((sum, trade) => sum + trade.entryPrice, 0) / staticTrades.length

  const tradesWithPL = staticTrades.map((trade) => {
    const costBasis = trade.shares * trade.entryPrice
    const currentValue = trade.shares * trade.currentPrice
    const pl = currentValue - costBasis
    const plPercent = (pl / costBasis) * 100
    return { ...trade, pl, plPercent, costBasis, currentValue }
  })

  const totalPL = tradesWithPL.reduce((sum, trade) => sum + trade.pl, 0)
  const totalCostBasis = tradesWithPL.reduce((sum, trade) => sum + trade.costBasis, 0)
  const totalCurrentValue = tradesWithPL.reduce((sum, trade) => sum + trade.currentValue, 0)

  const outcomeData = staticTrades.reduce((acc: Record<string, number>, trade) => {
    acc[trade.outcome] = (acc[trade.outcome] || 0) + trade.shares
    return acc
  }, {})

  const [userTrades, setUserTrades] = useState<any[]>([]);

  const getUserTradesSummary = async (userAddress: string) => {
    try {
      if (!userAddress) return { allTrades: [], totalPnL: 0, activeTrades: [] };
  
      const url = 'https://data-api.polymarket.com/positions?user=0xa9456cecF9d6fb545F6408E0e2DbBFA307d7BaE6';
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      });

      const text = await res.text();
      // console.log('text', text[0]);

      const data = JSON.parse(text);
      console.log('data', data[0]);
      setUserTrades(data);

      // const PnL = await fetch('https://data-api.polymarket.com/v1/leaderboard?timePeriod=day&orderBy=PNL&limit=1&offset=0&user=0xa9456cecF9d6fb545F6408E0e2DbBFA307d7BaE6&category=overall')
      // const PnLData = await PnL.json();
      // console.log('PnL', PnLData);

      
      return { allTrades: data };
    } catch (err) {
      return { allTrades: [], totalPnL: 0, activeTrades: [] };
    }
  };

  useEffect(() => {
    const fetchTrades = async () => {
      const data = await getUserTradesSummary("0x6dfb4ba28112d05c2d74fea137c0af7b6acb3687");
      // console.log('data', data);


    //         const data2 = await fetch(
    //     'https://data-api.polymarket.com/trades?user=0xa9456cecF9d6fb545F6408E0e2DbBFA307d7BaE6'
    // );
    // // const data = await utilsGetUserTrades();
    // console.log('data', data2);
    // const positions = await data2.json();
    // console.log('positions', positions);

    }
    fetchTrades()
  }, [])


  // useEffect(() => {
  //   const fetchTrades = async () => {
  //     const data = await fetch(
  //       'https://data-api.polymarket.com/trades?user=0xa9456cecF9d6fb545F6408E0e2DbBFA307d7BaE6'
  //   );
  //   // const data = await utilsGetUserTrades();
  //   console.log('data', data);
  //   const positions = await data.json();
  //   console.log('positions', positions);
  // }
  // fetchTrades()
  // }, [])

  const maxOutcomeShares = Math.max(...Object.values(outcomeData), 1)
  console.log('userTrades before return', userTrades);

  function formatDateWithYear(dateString) {
    let date = new Date(dateString);
    let day = String(date.getDate()).padStart(2, '0');  // Add leading zero if needed
    let month = String(date.getMonth() + 1).padStart(2, '0');  // Get month (0-indexed)
    let year = date.getFullYear();  // Get the full year
  
    // Return formatted string as "DD/MM/YY" and append full year at the end
    return `${day}/${month}/${String(year)}`;
  }

  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
      const fetchLeaderboard = async () => {
        const response = await fetch('https://data-api.polymarket.com/v1/leaderboard?timePeriod=day&orderBy=PNL&limit=1&offset=0&user=0xa9456cecF9d6fb545F6408E0e2DbBFA307d7BaE6&category=overall');
        const data = await response.json();
        console.log('Leaderboard', data);
        setLeaderboard(data);
      }
      fetchLeaderboard();
  }, [userTrades]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Polymarket Trading Dashboard</h1>
          <p className="text-slate-400">Real-time trading statistics and market analysis</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">Dummy</div>
              <p className="text-xs text-slate-500 mt-1">Transactions recorded</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Total Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">Dummy</div>
              <p className="text-xs text-slate-500 mt-1">USD value traded</p>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">Dummy</div>
              <p className="text-xs text-slate-500 mt-1">Per share</p>
            </CardContent>
          </Card>

          <Card
            className={`border-slate-700 bg-slate-800/50 backdrop-blur ${totalPL >= 0 ? "border-green-500/30" : "border-red-500/30"}`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-400">Daily P/L</CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboard && leaderboard[0] && leaderboard[0].pnl && (
                <div className={`text-3xl font-bold ${leaderboard[0].pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                  $ {leaderboard[0].pnl.toFixed(2)}
                </div>
              )}
     
            </CardContent>
          </Card>
        </div>

        {/* Outcome Distribution */}
        {/* <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white font-serif">Outcome Distribution</CardTitle>
            <CardDescription className="text-slate-400">Share distribution by outcome</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(outcomeData).map(([outcome, shares], idx) => {
                const percentage = (shares / maxOutcomeShares) * 100
                const colors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-amber-500", "bg-emerald-500"]
                const color = colors[idx % colors.length]

                return (
                  <div key={outcome} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-white">{outcome}</span>
                      <span className="text-sm text-slate-400">{shares.toFixed(0)} shares</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${color} h-full rounded-full transition-all`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card> */}

        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardHeader>
            {/* <CardTitle className="text-white font-serif">Recent Trades</CardTitle> */}
            <CardDescription className="text-slate-400">Total Open trades = {userTrades.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-400">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-400">Outcome</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-400">Shares</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-400">Avg Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-400">Current Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-400">P/L</th>
                    {/* <th className="text-right py-3 px-4 font-semibold text-slate-400">Return %</th> */}
                    <th className="text-left py-3 px-4 font-semibold text-slate-400">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userTrades.map((trade) => (
                    <tr key={trade.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 px-4 text-white max-w-xs truncate">{trade.title}</td>
                      <td className="py-3 px-4 text-white">
                        <span
                          // className={`px-2 py-1 rounded text-xs font-semibold ${trade.outcome === "Yes" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                        >
                          {trade.outcome}
                        </span>
                      </td>
                      <td className="text-right py-3 px-4 text-white">{trade.size}</td>
                      <td className="text-right py-3 px-4 text-slate-300">${trade.avgPrice}</td>
                      <td className="text-right py-3 px-4 text-slate-300">${trade.curPrice}</td>
                      <td
                        className={`text-right py-3 px-4 font-semibold ${trade.percentPnl >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {trade.percentPnl >= 0 ? "+" : ""}
                        {Number(trade.percentPnl).toFixed(4)}
                      </td>
                      <td
                        className='text-right py-3 px-4 font-semibold text-white'
                      >
                        {/* {trade.plPercent >= 0 ? "+" : ""}
                        {trade.plPercent.toFixed(2)}% */}
                        {formatDateWithYear(trade.endDate)}
                      </td>
                      {/* <td className="py-3 px-4 text-slate-500 text-xs">
                        {new Date(trade.endDate).()}
                        123
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
