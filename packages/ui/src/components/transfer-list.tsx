'use client'

import { Button } from '@repo/ui/components/ui/button'
import { Input } from '@repo/ui/components/ui/input'
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { ScrollArea } from "@repo/ui/components/ui/scroll-area"
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react'
import { cn } from "@repo/ui/lib/utils"
import React from 'react'

/**
 * 基础传输列表项类型
 */
export interface BaseTransferListItem {
	/** 唯一标识符 */
	key: string
	/** 显示标签 */
	label: string
	/** 是否选中 */
	selected?: boolean
	/** 是否禁用 */
	disabled?: boolean
}

/**
 * 支持自定义扩展的传输列表项类型
 * @template T 扩展属性类型
 */
export type TransferListItem<T = {}> = BaseTransferListItem & T

/**
 * 传输列表组件属性
 * @template T 扩展属性类型
 */
export interface TransferListProps<T = {}> {
	/** 要显示的项目列表 */
	items: TransferListItem<T>[]
	/** 项目转移时的回调函数 */
	onChange?: (leftItems: TransferListItem<T>[], rightItems: TransferListItem<T>[]) => void
	/** 面板标题 [左侧, 右侧] */
	titles?: [string, string]
	/** 是否显示搜索输入框 */
	searchable?: boolean
	/** 搜索输入框占位符 [左侧, 右侧] */
	searchPlaceholders?: [string, string]
	/** 列表高度 */
	height?: string | number
	/** 自定义类名 */
	className?: string
	/** 初始右侧项目 */
	initialRightItems?: TransferListItem<T>[]
	/** 自定义渲染每个选项的函数 */
	renderItem?: (item: TransferListItem<T>, side: 'left' | 'right') => React.ReactNode
}

/**
 * 传输列表组件
 * @template T 扩展属性类型
 */
export function TransferList<T = {}>({
	items,
	onChange,
	titles = ['Source', 'Target'],
	searchable = true,
	searchPlaceholders = ['Search', 'Search'],
	height = '300px',
	className,
	initialRightItems = [],
	renderItem
}: TransferListProps<T>) {
	// 初始化左侧和右侧列表
	const [leftList, setLeftList] = React.useState<TransferListItem<T>[]>(() => {
		// 创建所有项目的副本，以避免修改原始数据
		const itemsCopy = [...items] as TransferListItem<T>[];
		
		// 过滤出不在右侧列表中且未被选中的项目
		return itemsCopy.filter(item => {
			// 如果项目在initialRightItems中，不应该在左侧显示
			if (initialRightItems && initialRightItems.some(rightItem => rightItem.key === item.key)) {
				return false;
			}
			
			// 如果项目被标记为selected，不应该在左侧显示
			if (item.selected) {
				return false;
			}
			
			// 其他项目应该在左侧显示
			return true;
		});
	});
	
	const [rightList, setRightList] = React.useState<TransferListItem<T>[]>(() => {
		// 合并initialRightItems和被标记为selected的项目
		const rightItems = [...(initialRightItems || [])] as TransferListItem<T>[];
		
		// 添加被标记为selected的项目（如果它们不在initialRightItems中）
		items.forEach(item => {
			if (item.selected && !rightItems.some(rightItem => rightItem.key === item.key)) {
				rightItems.push({...item} as TransferListItem<T>);
			}
		});
		
		return rightItems;
	})
	const [leftSearch, setLeftSearch] = React.useState('')
	const [rightSearch, setRightSearch] = React.useState('')

	const moveToRight = () => {
		const selectedItems = leftList.filter((item) => item.selected)
		if (selectedItems.length === 0) return

		const newLeftList = leftList.filter((item) => !item.selected)
		// 保持selected属性，不将其重置为false
		const newRightList = [...rightList, ...selectedItems.map((item) => ({ ...item }))]

		setLeftList(newLeftList)
		setRightList(newRightList)
		onChange?.(newLeftList, newRightList)
	}

	const moveToLeft = () => {
		const selectedItems = rightList.filter((item) => item.selected)
		if (selectedItems.length === 0) return

		const newRightList = rightList.filter((item) => !item.selected)
		// 保持selected属性，不将其重置为false
		const newLeftList = [...leftList, ...selectedItems.map((item) => ({ ...item }))]

		setRightList(newRightList)
		setLeftList(newLeftList)
		onChange?.(newLeftList, newRightList)
	}

	const toggleSelection = (list: TransferListItem<T>[], setList: React.Dispatch<React.SetStateAction<TransferListItem<T>[]>>, key: string) => {
		setList(
			list.map((item) => {
				if (item.key === key && !item.disabled) {
					return { ...item, selected: !item.selected }
				}
				return item
			})
		)
	}

	const selectAll = (list: TransferListItem<T>[], setList: React.Dispatch<React.SetStateAction<TransferListItem<T>[]>>, selected: boolean) => {
		setList(
			list.map((item) => {
				if (!item.disabled) {
					return { ...item, selected }
				}
				return item
			})
		)
	}

	const filteredLeftList = leftList.filter((item) => 
		item.label.toLowerCase().includes(leftSearch.toLowerCase())
	)

	const filteredRightList = rightList.filter((item) => 
		item.label.toLowerCase().includes(rightSearch.toLowerCase())
	)

	const leftSelectedCount = filteredLeftList.filter(item => item.selected).length
	const rightSelectedCount = filteredRightList.filter(item => item.selected).length

	return (
		<div className={cn('flex gap-4', className)}>
			{/* Left Panel */}
			<Card className="flex-1">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-base">{titles[0]}</CardTitle>
						<Badge variant="secondary">
							{leftSelectedCount}/{filteredLeftList.length}
						</Badge>
					</div>
					{searchable && (
						<div className="relative">
							<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder={searchPlaceholders[0]}
								value={leftSearch}
								onChange={(e) => setLeftSearch(e.target.value)}
								className="pl-8"
							/>
						</div>
					)}
				</CardHeader>
				<CardContent className="p-0">
					<div className="flex items-center justify-between px-3 py-2 border-t border-b">
						<div className="flex items-center">
							<Checkbox 
								checked={filteredLeftList.length > 0 && filteredLeftList.every(item => item.selected)}
								onCheckedChange={(checked) => selectAll(leftList, setLeftList, !!checked)}
							/>
							<span className="ml-2 text-sm">Select All</span>
						</div>
						<Button 
							size="sm" 
							variant="ghost" 
							onClick={moveToRight}
							disabled={leftSelectedCount === 0}
						>
							<ChevronRightIcon className="h-4 w-4 mr-1" />
							Move
						</Button>
					</div>
					<ScrollArea 
						className="p-1"
						style={{ height: typeof height === 'number' ? `${height}px` : height }}
					>
						{filteredLeftList.length === 0 ? (
							<div className="flex items-center justify-center h-full text-muted-foreground">
								No items
							</div>
						) : (
							<ul className="space-y-1">
								{filteredLeftList.map((item) => (
									<li 
										key={item.key}
										className={cn(
											"flex items-center px-2 py-1.5 rounded-md",
											"hover:bg-muted/50 transition-colors",
											item.selected && "bg-muted",
											item.disabled && "opacity-50 cursor-not-allowed"
										)}
									>
										<Checkbox 
											checked={item.selected}
											onCheckedChange={() => toggleSelection(leftList, setLeftList, item.key)}
											disabled={item.disabled}
											className="mr-2"
										/>
										{renderItem ? (
											renderItem(item, 'left')
										) : (
											<span className="text-sm">{item.label}</span>
										)}
									</li>
								))}
							</ul>
						)}
					</ScrollArea>
				</CardContent>
			</Card>

			{/* Right Panel */}
			<Card className="flex-1">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle className="text-base">{titles[1]}</CardTitle>
						<Badge variant="secondary">
							{rightSelectedCount}/{filteredRightList.length}
						</Badge>
					</div>
					{searchable && (
						<div className="relative">
							<SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder={searchPlaceholders[1]}
								value={rightSearch}
								onChange={(e) => setRightSearch(e.target.value)}
								className="pl-8"
							/>
						</div>
					)}
				</CardHeader>
				<CardContent className="p-0">
					<div className="flex items-center justify-between px-3 py-2 border-t border-b">
						<Button 
							size="sm" 
							variant="ghost" 
							onClick={moveToLeft}
							disabled={rightSelectedCount === 0}
						>
							<ChevronLeftIcon className="h-4 w-4 mr-1" />
							Move
						</Button>
						<div className="flex items-center">
							<span className="mr-2 text-sm">Select All</span>
							<Checkbox 
								checked={filteredRightList.length > 0 && filteredRightList.every(item => item.selected)}
								onCheckedChange={(checked) => selectAll(rightList, setRightList, !!checked)}
							/>
						</div>
					</div>
					<ScrollArea 
						className="p-1"
						style={{ height: typeof height === 'number' ? `${height}px` : height }}
					>
						{filteredRightList.length === 0 ? (
							<div className="flex items-center justify-center h-full text-muted-foreground">
								No items
							</div>
						) : (
							<ul className="space-y-1">
								{filteredRightList.map((item) => (
									<li 
										key={item.key}
										className={cn(
											"flex items-center px-2 py-1.5 rounded-md",
											"hover:bg-muted/50 transition-colors",
											item.selected && "bg-muted",
											item.disabled && "opacity-50 cursor-not-allowed"
										)}
									>
										<Checkbox 
											checked={item.selected}
											onCheckedChange={() => toggleSelection(rightList, setRightList, item.key)}
											disabled={item.disabled}
											className="mr-2"
										/>
										{renderItem ? (
											renderItem(item, 'right')
										) : (
											<span className="text-sm">{item.label}</span>
										)}
									</li>
								))}
							</ul>
						)}
					</ScrollArea>
				</CardContent>
			</Card>
		</div>
	)
}