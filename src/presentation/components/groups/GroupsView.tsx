'use client';

/**
 * GroupsView
 * Main groups management page
 */

import { AnimatedButton } from '@/src/presentation/components/ui/AnimatedButton';
import { GroupsViewModel } from '@/src/presentation/presenters/groups/GroupsPresenter';
import { useGroupsPresenter } from '@/src/presentation/presenters/groups/useGroupsPresenter';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { AIGroupFinder } from './AIGroupFinder';
import { GroupCard } from './GroupCard';

interface GroupsViewProps {
  initialViewModel?: GroupsViewModel;
}

export function GroupsView({ initialViewModel }: GroupsViewProps) {
  const [state, actions] = useGroupsPresenter(initialViewModel);
  const { groups, loading, error, searchQuery } = state;
  
  const [showAIFinder, setShowAIFinder] = useState(false);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const trail = useTrail(groups.length, {
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 200, friction: 20 },
  });

  const handleDelete = async (id: string) => {
    if (confirm('ยืนยันการลบกลุ่มนี้?')) {
      await actions.deleteGroup(id);
    }
  };

  // Stats
  const activeGroups = groups.filter((g) => g.status === 'active').length;
  const totalMembers = groups.reduce((sum, g) => sum + (g.members || 0), 0);

  if (loading && groups.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <animated.div style={headerSpring} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            กลุ่มเป้าหมาย
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {activeGroups} กลุ่มใช้งาน • รวม {totalMembers.toLocaleString()} สมาชิก
          </p>
        </div>

        <AnimatedButton variant="gradient" onClick={() => setShowAIFinder(!showAIFinder)}>
          <Plus className="w-4 h-4 mr-1" />
          {showAIFinder ? 'ปิดเครื่องมื่อค้นหา' : 'เพิ่มกลุ่มใหม่'}
        </AnimatedButton>
      </animated.div>

      {/* AI Group Finder */}
      {showAIFinder && (
        <AIGroupFinder
          onAddGroup={(group) => {
            console.log('Add group:', group);
            actions.refreshGroups();
          }}
        />
      )}

      {/* Search */}
      <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => actions.setSearchQuery(e.target.value)}
          placeholder="ค้นหากลุ่ม..."
          className="ml-3 flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {/* Groups grid */}
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trail.map((spring, index) => (
            <animated.div key={groups[index].id} style={spring}>
              <GroupCard
                group={groups[index]}
                onEdit={(id) => console.log('Edit:', id)}
                onDelete={handleDelete}
                onToggleAutoPost={(id) => actions.toggleAutoPost(id, groups[index].autoPost)}
              />
            </animated.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            ไม่พบกลุ่ม
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            ลองค้นหาใหม่หรือใช้ AI ค้นหากลุ่มอัตโนมัติ
          </p>
        </div>
      )}
    </div>
  );
}
