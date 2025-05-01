import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PopularStats = () => {
  const popularCategories = [
    {
      id: 1,
      title: "Student Demographics",
      icon: "👨‍🎓",
      stats: ["42,650 enrolled students", "36% international students"],
    },
    {
      id: 2,
      title: "Academic Performance",
      icon: "📚",
      stats: ["3.4 average GPA", "92.4% graduation rate"],
    },
    {
      id: 3,
      title: "Faculty",
      icon: "👩‍🏫",
      stats: ["2,680 faculty members", "16:1 student-faculty ratio"],
    },
    {
      id: 4,
      title: "Research Output",
      icon: "🔬",
      stats: ["4,200+ publications annually", "$386M in research funding"],
    },
    {
      id: 5,
      title: "Campus Resources",
      icon: "🏢",
      stats: ["18 libraries", "42 research centers"],
    },
    {
      id: 6,
      title: "Graduate Outcomes",
      icon: "🎓",
      stats: ["93% employed within 6 months", "$68,500 average starting salary"],
    },
  ];

  return (
    <section className="py-12 bg-[#f2f2f2] w-full">
      <div className="w-full px-4">
        <div className="mb-10 text-start">
          <p className="max-w-xl mt-2 mx-0 text-lg text-left">
            Explore the most accessed university data at a glance.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularCategories.map((category) => (
            <Card
              key={category.id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
            >
              <div className="px-4 py-2 bg-[#57B4BA] flex items-start justify-between text-white">
                <h3 className="text-md font-medium leading-tight w-3/4">{category.title}</h3>
                <div className="text-md">{category.icon}</div>
              </div>
              <CardContent className="p-5 flex flex-col justify-between flex-grow">
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  {category.stats.map((stat, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 mt-1.5 rounded-full bg-abs-teal mr-3"></span>
                      {stat}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end mt-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-sm border-abs-blue text-abs-blue hover:bg-abs-blue hover:text-white transition-all duration-200"
                  >
                    View All Stats
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularStats;
