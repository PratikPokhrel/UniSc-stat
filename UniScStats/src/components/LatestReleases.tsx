import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Proportions } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LatestReleases = () => {
  const navigate = useNavigate();

  const academicReleases = [
    {
      id: 1,
      title: "Student Performance Report",
      date: "23 Apr 2025",
      description: "Comprehensive analysis of student academic performance by faculties.",
      type: "Data Report"
    },
    {
      id: 2,
      title: "Course Satisfaction Survey",
      date: "19 Apr 2025",
      description: "Results of the semester course satisfaction surveys from all departments.",
      type: "Survey Results"
    },
    {
      id: 3,
      title: "Faculty Research Output",
      date: "15 Apr 2025",
      description: "Analysis of research publications and citations by department.",
      type: "Research Report"
    },
    {
      id: 4,
      title: "Academic Calendar 2025-2026",
      date: "10 Apr 2025",
      description: "Official academic calendar for the upcoming academic year.",
      type: "Administrative Release"
    }
  ];

  const admissionsReleases = [
    {
      id: 5,
      title: "Enrollment Demographics",
      date: "22 Apr 2025",
      description: "Demographic breakdown of newly admitted students for the Fall semester.",
      type: "Data Report"
    },
    {
      id: 6,
      title: "Admissions Trends Analysis",
      date: "18 Apr 2025",
      description: "Multi-year analysis of application and admission rates by program.",
      type: "Data Report"
    },
    {
      id: 7,
      title: "International Student Report",
      date: "12 Apr 2025",
      description: "Statistics on international student recruitment and retention.",
      type: "Data Report"
    },
    {
      id: 8,
      title: "Scholarship Distribution",
      date: "8 Apr 2025",
      description: "Analysis of scholarship and financial aid distribution for incoming students.",
      type: "Financial Report"
    }
  ];

  const financialReleases = [
    {
      id: 9,
      title: "Annual Budget Report",
      date: "21 Apr 2025",
      description: "Detailed breakdown of university budget allocation and spending.",
      type: "Financial Report"
    },
    {
      id: 10,
      title: "Research Grant Summary",
      date: "17 Apr 2025",
      description: "Summary of research grants received and their distribution across departments.",
      type: "Financial Report"
    },
    {
      id: 11,
      title: "Endowment Performance",
      date: "11 Apr 2025",
      description: "Analysis of the university endowment fund performance and investments.",
      type: "Financial Report"
    },
    {
      id: 12,
      title: "Capital Projects Update",
      date: "6 Apr 2025",
      description: "Status update on ongoing capital improvement projects across campus.",
      type: "Administrative Release"
    }
  ];

  return (
    <section className="py-4" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="w-full px-4 ">
        <Tabs defaultValue="academic" className="w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <TabsList className="grid grid-cols-3 max-w-md">
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="admissions">Admissions</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>

            <Button
              size='sm'
              className="bg-abs-blue hover:bg-opacity-90 whitespace-nowrap ml-0 md:ml-4"
              onClick={() => navigate('/report-list')}
            >
              View All Reports
            </Button>
          </div>

          <TabsContent value="academic" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {academicReleases.map(release => (
                <Card key={release.id} className="hover:shadow-md transition-shadow relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2 text-abs-teal">
                      <FileText className="mr-2 h-5 w-5" />
                      <CardDescription>{release.type}</CardDescription>
                    </div>
                    <CardTitle className="text-lg">{release.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{release.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{release.date}</span>
                    </div>
                  </CardContent>
                  <div className="absolute bottom-3 right-3 flex items-center justify-center bg-[#f2f2f2] rounded-full p-2">
                    <Proportions className="h-6 w-6 text-green-500" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="admissions" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {admissionsReleases.map(release => (
                <Card key={release.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2 text-abs-teal">
                      <FileText className="mr-2 h-5 w-5" />
                      <CardDescription>{release.type}</CardDescription>
                    </div>
                    <CardTitle className="text-lg">{release.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{release.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{release.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-abs-blue border-abs-blue hover:bg-abs-blue hover:text-white">
                      View Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="financial" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialReleases.map(release => (
                <Card key={release.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center mb-2 text-abs-teal">
                      <FileText className="mr-2 h-5 w-5" />
                      <CardDescription>{release.type}</CardDescription>
                    </div>
                    <CardTitle className="text-lg">{release.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{release.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{release.date}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-abs-blue border-abs-blue hover:bg-abs-blue hover:text-white">
                      View Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LatestReleases;
