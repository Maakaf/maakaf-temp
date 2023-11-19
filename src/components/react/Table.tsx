import React, { type ReactNode } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
interface TableProps {
  data: Record<string, string>[];
}
const Table = ({ data }: TableProps) => { 
  function validUrl(str: string) {
    let url;

    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  function createColumns(data: Record<string, string>[]) {
    if (!data.length) return [] // return empty array if no data
    const columnHelper = createColumnHelper<typeof data[0]>()
    const dataColumns = [];
    for (const key in data[0]) {
      dataColumns.push(columnHelper.accessor(key, {
        header: key,
        cell: info => validUrl(info.getValue())? <a target="_blank" href={info.getValue()}>{key}</a>: info.getValue() 
      }))
    }
    return dataColumns
  }
  const columns = createColumns(data)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  
  return (
    <div className="p-2 overflow-y-auto w-full">
      <table className="table table-zebra border text-center">
        <thead className="text-neutral-content">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-neutral">
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-5 py-3">
                  {header.isPlaceholder
                    ? null
                    : (
                      <span className="text-lg">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) as ReactNode}
                      </span>
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover bg-neutral-focus transition">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  ) as ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};
export default Table;
