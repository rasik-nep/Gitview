import { render, screen } from "@testing-library/react";
import RepoCard from "@/components/RepoCard";
import { Repo } from "@/types/github";

describe("RepoCard", () => {
  const mockRepo: Repo = {
    id: 1,
    name: "test-repo",
    full_name: "test-owner/test-repo",
    html_url: "https://github.com/test-owner/test-repo",
    description: "A test repository",
    stargazers_count: 100,
    forks_count: 50,
    language: "TypeScript",
    updated_at: "2024-03-20T12:00:00Z",
    owner: {
      login: "test-owner",
      avatar_url: "https://github.com/avatar.png",
      name: "Test Owner",
      bio: "Test bio",
      public_repos: 10,
      public_gists: 5,
      followers: 100,
      following: 50,
      html_url: "https://github.com/test-owner",
      location: "Test Location",
      blog: "https://test-blog.com",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-03-20T12:00:00Z",
    },
  };

  it("renders repository information correctly", () => {
    render(<RepoCard repo={mockRepo} />);

    // Check if the repository name is rendered
    expect(screen.getByText("test-repo")).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText("A test repository")).toBeInTheDocument();

    // Check if stars count is rendered
    expect(screen.getByText("Stars: 100")).toBeInTheDocument();

    // Check if forks count is rendered
    expect(screen.getByText("Forks: 50")).toBeInTheDocument();

    // Check if language is rendered
    expect(screen.getByText("Language: TypeScript")).toBeInTheDocument();

    // Check if the "View more" link is rendered with correct href
    const viewMoreLink = screen.getByText("View more");
    expect(viewMoreLink).toBeInTheDocument();
    expect(viewMoreLink.closest("a")).toHaveAttribute(
      "href",
      "/repos/test-owner/test-repo"
    );
  });

  it("handles missing description and language", () => {
    const repoWithoutOptionalFields: Repo = {
      ...mockRepo,
      description: null,
      language: null,
    };

    render(<RepoCard repo={repoWithoutOptionalFields} />);

    // Check if "N/A" is shown for missing language
    expect(screen.getByText("Language: N/A")).toBeInTheDocument();

    // Check if the description is not rendered
    expect(screen.queryByText("A test repository")).not.toBeInTheDocument();
  });
});
