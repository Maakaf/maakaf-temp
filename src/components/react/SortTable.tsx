import React from 'react'

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'

import projects from "@assets/table_data/projects.json"

function SortTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = React.useMemo<ColumnDef<any>[]>(
    () =>  
       [
          {
            accessorKey: 'Project name',
            header: () => 'Project name',
            footer: props => props.column.id,
          },
          {
            accessorKey: 'Programming language',
            header: () => 'Programming language',
            footer: props => props.column.id,
          },
          {
            accessorKey: 'Project link',
            header: () => 'Project link',
            footer: props => props.column.id,
            cell: (info) => <span>
                  <a target="_blank" href={info.getValue() as string}>{'Project link'}</a>
                </span>
          },
          {
            accessorKey: 'Discord link',
            header: () => 'Discord link',
            footer: props => props.column.id,
            cell: (info) => <span>
                  <a target="_blank" href={info.getValue() as string}>{'Discord link'}</a>
                </span> 
          },
          {
            accessorKey: "Tags",
            header: () => 'Tags',
            footer: props => props.column.id,
          },
        ],
    []
  )

  const [data, setData] = React.useState(() => projects)

  const table = useReactTable({
    data,
    columns,
    enableSorting: true,
    sortDescFirst: true,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  return (
    <div className="p-2 w-full">
      <div className="h-2" />
      <table className="table table-zebra border text-center">
        <thead className="text-neutral-content">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}  className="bg-neutral">
              {headerGroup.headers.map(header => {
                return (
                  <th 
                    key={header.id} 
                    colSpan={header.colSpan} 
                    className="px-5 py-3">
                    {header.isPlaceholder ? null :
                      (header.column.id !== 'Discord link' && header.column.id !== 'Project link') ? (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                       <span className="text-lg">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) :
                    (
                      <div
                      >
                       <span className="text-lg">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      </div>
                    )
                    }
                  
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows
            .map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default SortTable;
