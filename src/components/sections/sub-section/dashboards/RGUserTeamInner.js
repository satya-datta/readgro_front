"use client";
import { useEffect, useState } from "react";
import { useUserContext } from "@/contexts/UserContext";
import HeadingDashboard from "@/components/shared/headings/HeadingDashboard";
import Testloader from "@/components/shared/others/loader";

const RGUserTeamInner = () => {
  const { user } = useUserContext(); // Retrieve user data from context
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeamData = async () => {
    if (!user || !user?.userId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/getteam/${user.userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      console.log(data.team);
      setTeamData(data.team || []); // Ensure data is in array format
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, [user]);

  return (
    <div className="p-10px md:px-10 md:py-50px mb-30px bg-whiteColor dark:bg-whiteColor-dark shadow-accordion dark:shadow-accordion-dark rounded-5">
      <HeadingDashboard>Team</HeadingDashboard>
      <hr className="my-4 border-contentColor opacity-35" />

      <div>
        {loading ? (
          <div>
            <Testloader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead className="text-sm md:text-base text-blackColor dark:text-blackColor-dark bg-lightGrey5 dark:bg-whiteColor-dark leading-1.8 md:leading-1.8">
                <tr>
                  <th className="px-5px py-10px md:px-5">#</th>
                  <th className="px-5px py-10px md:px-5">Name</th>
                  <th className="px-5px py-10px md:px-5">Email</th>
                  <th className="px-5px py-10px md:px-5">
                    Enrollment Date & Time
                  </th>
                  <th className="px-5px py-10px md:px-5">Contact No</th>
                  <th className="px-5px py-10px md:px-5">Course Name</th>
                  <th className="px-5px py-10px md:px-5">Sponsor</th>
                  {/* <th className="px-5px py-10px md:px-5">Level</th> */}
                  <th className="px-5px py-10px md:px-5">Amount</th>
                </tr>
              </thead>
              <tbody className="text-size-13 md:text-base text-contentColor dark:text-contentColor-dark font-normal">
                {teamData.length > 0 ? (
                  teamData.map((member, index) => (
                    <tr key={member.id} className="leading-1.8 md:leading-1.8">
                      <td className="px-5px py-10px md:px-5 font-normal">
                        {index + 1}
                      </td>
                      <td className="px-5px py-10px md:px-5 font-normal">
                        {member.name}
                      </td>
                      <td className="px-5px py-10px md:px-5 font-normal">
                        {member.email}
                      </td>
                      <td className="px-5px py-10px md:px-5 font-normal">
                        {new Date(member.enrollmentDate).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false, // 24-hour format
                          }
                        )}
                      </td>

                      <td className="px-5px py-10px md:px-5 font-normal">
                        {member.phone || 'N/A'}
                      </td>
                      <td className="px-5px py-10px md:px-5 font-normal">
                        {member.courseName || member.packageName || 'N/A'}
                      </td>
                      <td className="px-5px py-10px md:px-5 font-normal">
                        {user?.name || 'N/A'}
                      </td>
                      {/* <td className="px-5px py-10px md:px-5 font-normal">{member.level}</td> */}
                      <td className="px-5px py-10px md:px-5 font-normal font-bold text-blackColor dark:text-blackColor-dark">
                        ₹{member.referralAmount ?? "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-10px">
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RGUserTeamInner;
