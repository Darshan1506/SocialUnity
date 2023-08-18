import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserCard from "../cards/UserCard";
import SidebarCard from "./SidebarCard";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function RightSidebar() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // fetch all users

  const results = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  // all communities
  const Communityresults = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  console.log(Communityresults)
  // Display a maximum of 5 users
  const maxUsers = 4;
  const usersToDisplay = results.users.slice(0, maxUsers);

  const maxCommunities = 4;
  const communitiesToDisplay = Communityresults.communities.slice(0,maxCommunities)

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <div className="mt-5 flex flex-col gap-9">
          {usersToDisplay.length === 0 ? (
            <p className="no-result">No Users</p>
          ) : (
            <>
              {usersToDisplay.map((person) => (
                <SidebarCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Communities</h3>
        <div className="mt-5 flex flex-col gap-9">
          {communitiesToDisplay.length === 0 ? (
            <p className="no-result">No Community</p>
          ) : (
            <>
              {communitiesToDisplay.map((person) => (
                <SidebarCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
