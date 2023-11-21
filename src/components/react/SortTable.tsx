import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  flexRender,
} from "@tanstack/react-table";
import { ClipLoader } from "react-spinners";
import { Octokit } from "@octokit/rest";

interface GitHubRepository {
  name: string;
  language: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  pushed_at: string;
  short_description: string;
  discord_link: string;
}

interface SortTableProps {
  repositoryLinks: string[];
  discordLinks: string[];
}

function SortTable({ repositoryLinks, discordLinks }: SortTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [filteredData, setFilteredData] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const octokit = new Octokit();

        const repositoriesData = await Promise.all(
          repositoryLinks.map(async (link, index) => {
            const [owner, repo] = link.split("/").slice(-2);

            const { data } = await octokit.repos.get({ owner, repo });

            return {
              name: data.name,
              language: data.language || "N/A",
              html_url: data.html_url,
              description: data.description || "",
              stargazers_count: data.stargazers_count || 0,
              pushed_at: data.pushed_at,
              short_description: data.description
                ? data.description.split("\n")[0]
                : "",
              discord_link: discordLinks[index] || "",
            };
          })
        );

        setRepositories(repositoriesData);
        setFilteredData(repositoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from GitHub:", error);
      }
    })();
  }, [repositoryLinks, discordLinks]);

  useEffect(() => {
    if (languageFilter) {
      const filtered = repositories.filter(
        (repo) => repo.language === languageFilter
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(repositories);
    }
  }, [languageFilter, repositories]);

  const columns = useMemo<ColumnDef<GitHubRepository>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => "Project Name",
      },
      {
        accessorKey: "language",
        header: () => "Programming Language",
      },
      {
        accessorKey: "short_description",
        header: () => "Short Description",
      },
      {
        accessorKey: "html_url",
        header: () => "Project Link",
        cell: (info) => (
          <a
            href={info.row.original.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {info.row.original.html_url}
          </a>
        ),
        getCanSort: () => false,
      },
      {
        accessorKey: "discord_link",
        header: () => "Discord Link",
        cell: (info) => (
          <a
            href={info.row.original.discord_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {info.row.original.discord_link}
          </a>
        ),
      },
      {
        accessorKey: "stargazers_count",
        header: () => "Stars",
      },
      {
        accessorKey: "pushed_at",
        header: () => "Last Commit Date",
        cell: (info) =>
          new Date(info.row.original.pushed_at).toLocaleDateString(),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    enableSorting: true,
    sortDescFirst: true,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="p-2 w-full">
      <div className="filter-container">
        <label htmlFor="languageFilter">Filter by Language:</label>
        <select
          id="languageFilter"
          onChange={(e) => setLanguageFilter(e.target.value)}
          value={languageFilter || ""}
        >
          <option value="">All</option>
          {Array.from(new Set(repositories.map((item) => item.language))).map(
            (language) => (
              <option key={language} value={language}>
                {language}
              </option>
            )
          )}
        </select>
      </div>

      {loading ? (
        <ClipLoader color="white" loading={loading} size={50} />
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra border text-center">
            <thead className="text-neutral-content">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-neutral">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-5 py-3"
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <span className="text-lg">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getCanSort() && (
                          <span>
                            {header.column.getIsSorted() === "asc"
                              ? " 🔼"
                              : " 🔽"}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SortTable;
