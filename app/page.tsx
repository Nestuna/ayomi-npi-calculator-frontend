"use client";

import CalculationsTable from "@/components/CalculationsTable";
import { environement } from "@/environement";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";

interface Expression {
  expression_text: string;
}

interface Calculation {
  id: number
  expression: string
  result: number
}


export default function Home() {
  const [currentCalculation, setCurrentCalculation] = useState<Calculation | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const response = await fetch(`${environement.apiUrl}/calculate_npi/`, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });
    const calculation = await response.json();

    setCurrentCalculation(calculation);
    setCalculationsList([calculation, ...calculationsList])
  };

  const [calculationsList, setCalculationsList] = useState<Calculation[]>([])
  useEffect(() => {
    const fetchCalculations = async () => {
      const response = await fetch(`${environement.apiUrl}/calculations/`)
      const calculations = await response.json()
      calculations.reverse()
      setCalculationsList(calculations)
    }

    fetchCalculations()
  }, [])

  const displayCalculationsTable = () => {
    if (calculationsList.length) {
      return <CalculationsTable calculations={calculationsList} />
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-24">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form method="post" onSubmit={handleSubmit}>
          <div className="card-body">
            <h2 className="card-title">NPI Calculator</h2>
            <input
              type="text"
              name="expression_text"
              placeholder="Type your NPI expression"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <div className="container flex h-10 items-center justify-center bg-slate-600 rounded-md">
              {currentCalculation ? `Result : ${currentCalculation.result}` : null}
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" type="submit">
                Calculate
              </button>
            </div>
          </div>
        </form>
      </div>
      { displayCalculationsTable() }
    </main>
  );
}
