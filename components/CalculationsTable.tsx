import { environement } from '@/environement'
import { Calculation } from '@/types'
import React from 'react'

const CalculationsTable = ({ calculations }: { calculations: Calculation[] }) => {
  const downloadCSV = async () => {
    const response = await fetch(`${environement.apiUrl}/calculations/csv/`)
    const data = await response.text()

    const url = window.URL.createObjectURL(new Blob([data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', "npi.csv")
      document.body.appendChild(link)
      link.click()
      link.remove()
  }

  return (
    <div className="container bg-base-100 shadow-xl rounded-lg p-8">
        <div className='flex flex-row justify-between'>
          <h2 className="text-xl font-bold">Last Results</h2>
          <button className='btn btn-primary' onClick={downloadCSV}>Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Expression</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {
                calculations.map((value: Calculation | null, index: number) => {
                  if (value) {
                    return (
                      <tr className="bg-base-200" key={index}>
                        <td>{value.id}</td>
                        <td>{value.expression}</td>
                        <td>{value.result}</td>
                      </tr>
                    )
                  }
                })
              }
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default CalculationsTable
