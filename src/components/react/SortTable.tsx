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

import githubLogo from "@assets/images/members/github-logo.png";
import discordLogo from "@assets/images/members/discord-logo.png";

interface GitHubRepository {
  name: string;
  language: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  updated_at: string;
  short_description: string;
  discord_link: string;
}

interface ProjectData {
  githubLink: string;
  discordLink: string;
}

function SortTable({ projectData }: { projectData: ProjectData[] }) {
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
        projectData.map(async ({ githubLink, discordLink }) => {
          const [owner, repo] = githubLink.split('/').slice(-2);
          const { data } = await octokit.repos.get({ owner, repo });

          return {
            name: data.name,
            language: data.language || "N/A",
            html_url: data.html_url,
            description: data.description || "",
            stargazers_count: data.stargazers_count || 0,
            updated_at: data.updated_at,
            short_description: data.description
              ? data.description.split("\n")[0]
              : "",
            discord_link: discordLink || "",
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
}, [projectData]);

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
        header: () => (
          <>
            Programming
            <br />
            Language
          </>
        ),
      },
      {
        accessorKey: "short_description",
        header: () => (
          <>
            Short
            <br />
            Description
          </>
        ),
      },
      {
        accessorKey: "html_url",
        header: () => (
          <>
            Project
            <br />
            Link
          </>
        ),
        cell: (info) => (
          <a
            href={info.row.original.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubLogo.src}
              alt="Github Logo"
              style={{
                width: "30px",
                display: "block",
                margin: "auto",
              }}
            />
          </a>
        ),
      },
      {
        accessorKey: "discord_link",
        header: () => (
          <>
            Discord
            <br />
            Link
          </>
        ),
        cell: (info) => (
          <a
            href={info.row.original.discord_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={discordLogo.src}
              alt="Discord Logo"
              style={{
                width: "30px",
                display: "block",
                margin: "auto",
              }}
            />
          </a>
        ),
      },
      {
        accessorKey: "stargazers_count",
        header: () => "Stars",
      },
      {
        accessorKey: "updated_at",
        header: () => (
          <>
            Last
            <br />
            Commit Date
          </>
        ),
        cell: (info) =>
          new Date(info.row.original.updated_at).toLocaleDateString("he-il"),
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

  const shouldSort = (columnId: string) => {
    const sortableColumns = ["language", "stargazers_count", "updated_at"];
    return sortableColumns.includes(columnId);
  };

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
                          className: shouldSort(header.column.id)
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: shouldSort(header.column.id)
                            ? header.column.getToggleSortingHandler()
                            : undefined,
                        }}
                      >
                        <span className="text-lg">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {shouldSort(header.column.id) && (
                          <span>
                            {header.column.getIsSorted() === "asc"
                              ? " 🔼"
                              : header.column.getIsSorted() === "desc"
                              ? " 🔽"
                              : " ↕️"}
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
