import { ArrowUpRight, Crown, Heart,TrendingUp, UserCheck, Users } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        {
            title: "Total Members",
            value: "24,580",
            growth: "+12.5%",
            icon: Users,
        },
        {
            title: "Premium Members",
            value: "5,240",
            growth: "+8.4%",
            icon: Crown,
        },
        {
            title: "Successful Matches",
            value: "1,486",
            growth: "+18.2%",
            icon: Heart,
        },
        {
            title: "Verified Profiles",
            value: "13,920",
            growth: "+9.7%",
            icon: UserCheck,
        },
    ];
    return (
        <div className="min-h-screen bg-slate-50 p-4">
            <div className="mb-8">
                <p className="text-gray-500 mt-2">
                    Welcome back to Bibah.app management panel
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-6 border border-red-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex justify-between items-center">
                                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                                    <Icon className="text-red-600" size={28} />
                                </div>

                                <div className="flex items-center gap-1 text-green-600 font-semibold">
                                    <ArrowUpRight size={16} />
                                    {item.growth}
                                </div>
                            </div>

                            <h3 className="text-gray-500 text-sm mt-6">
                                {item.title}
                            </h3>

                            <h2 className="text-4xl font-bold text-gray-900 mt-2">
                                {item.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            <div className="grid xl:grid-cols-3 gap-6 mt-8">
                <div className="xl:col-span-2 bg-white rounded-3xl border border-red-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Member Growth
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Last 12 months overview
                            </p>
                        </div>

                        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-medium">
                            +21.4%
                        </div>
                    </div>

                    <div className="h-80 flex items-end gap-4">
                        {[35, 55, 45, 70, 60, 85, 75, 95, 80, 100, 90, 120].map(
                            (item, index) => (
                                <div
                                    key={index}
                                    style={{ height: `${item * 2}px` }}
                                    className="flex-1 bg-gradient-to-t from-red-600 to-red-400 rounded-t-2xl"
                                />
                            )
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-red-100 p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Recent Activity
                    </h2>

                    <div className="space-y-5">
                        {[
                            "New premium subscription",
                            "Profile verification completed",
                            "New match request",
                            "Payment received",
                            "Profile boosted",
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4"
                            >
                                <div className="w-3 h-3 bg-red-500 rounded-full mt-2" />

                                <div>
                                    <h4 className="font-medium text-gray-800">
                                        {item}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        Just now
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-3xl border border-red-100 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="text-red-600" />
                        <h2 className="text-xl font-bold text-gray-900">
                            Platform Overview
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 rounded-2xl p-5">
                            <h3 className="text-gray-500 text-sm">
                                Male Profiles
                            </h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                12.4K
                            </p>
                        </div>

                        <div className="bg-red-50 rounded-2xl p-5">
                            <h3 className="text-gray-500 text-sm">
                                Female Profiles
                            </h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                11.8K
                            </p>
                        </div>

                        <div className="bg-red-50 rounded-2xl p-5">
                            <h3 className="text-gray-500 text-sm">
                                Monthly Revenue
                            </h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                ৳85K
                            </p>
                        </div>

                        <div className="bg-red-50 rounded-2xl p-5">
                            <h3 className="text-gray-500 text-sm">
                                Match Rate
                            </h3>
                            <p className="text-3xl font-bold text-gray-900 mt-2">
                                82%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                    <h2 className="text-3xl font-bold mb-2">
                        Bibah.app
                    </h2>

                    <p className="text-red-100 mb-8">
                        Connecting hearts, building families.
                    </p>

                    <div className="flex gap-8">
                        <div>
                            <h3 className="text-4xl font-bold">24K+</h3>
                            <p className="text-red-100">
                                Active Members
                            </p>
                        </div>

                        <div>
                            <h3 className="text-4xl font-bold">1.4K+</h3>
                            <p className="text-red-100">
                                Successful Matches
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;