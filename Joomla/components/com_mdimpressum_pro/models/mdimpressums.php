<?php

/**
 * @version    CVS: 4.2.2
 * @package    Com_Mdimpressum_pro
 * @author     Axel Metz <office@megrodesign.com>
 * @copyright  Copyright (C) 2016. Alle Rechte vorbehalten.
 * @license    GNU General Public License Version 2 oder später; siehe LICENSE.txt
 */
defined('_JEXEC') or die;

jimport('joomla.application.component.modellist');

/**
 * Methods supporting a list of Mdimpressum_pro records.
 *
 * @since  1.6
 */
class Mdimpressum_proModelMdimpressums extends JModelList
{
	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @see        JController
	 * @since      1.6
	 */
	public function __construct($config = array())
	{
		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = array(
				'id', 'a.id',
				'ordering', 'a.ordering',
				'state', 'a.state',
				'created_by', 'a.created_by',
				'firma', 'a.firma',
				'vrnummer', 'a.vrnummer',
				'name', 'a.name',
				'vorname', 'a.vorname',
				'str1', 'a.str1',
				'plz1', 'a.plz1',
				'ort1', 'a.ort1',
				'tel1', 'a.tel1',
				'tel2', 'a.tel2',
				'land1', 'a.land1',
				'email1', 'a.email1',
				'email2', 'a.email2',
				'fax1', 'a.fax1',
				'mobil1', 'a.mobil1',
				'website1', 'a.website1',
				'vnamen', 'a.vnamen',
				'vnamen2', 'a.vnamen2',
				'vsitz', 'a.vsitz',
				'vearnr', 'a.vearnr',
				'vlizbeh', 'a.vlizbeh',
				'vfinanz', 'a.vfinanz',
				'vstr', 'a.vstr',
				'vplz', 'a.vplz',
				'vort', 'a.vort',
				'vemail', 'a.vemail',
				'vtel', 'a.vtel',
				'vberuf', 'a.vberuf',
				'vkammer', 'a.vkammer',
				'vgesetzlbest', 'a.vgesetzlbest',
				'vland', 'a.vland',
				'vaufsicht', 'a.vaufsicht',
				'vhaft', 'a.vhaft',
				'vversich', 'a.vversich',
				'vversichnr', 'a.vversichnr',
				'vpersons', 'a.vpersons',
				'vsachs', 'a.vsachs',
				'vregg', 'a.vregg',
				'vreggnr', 'a.vreggnr',
				'ustid', 'a.ustid',
				'vwirtid', 'a.vwirtid',
				'tname', 'a.tname',
				'tvorname', 'a.tvorname',
				'tstr', 'a.tstr',
				'tplz', 'a.tplz',
				'tort', 'a.tort',
				'temail', 'a.temail',
				'ttel', 'a.ttel',
				'inname', 'a.inname',
				'invorname', 'a.invorname',
				'instr', 'a.instr',
				'inplz', 'a.inplz',
				'inort', 'a.inort',
				'inemail', 'a.inemail',
				'intel', 'a.intel',
				'bankinhaber', 'a.bankinhaber',
				'bankname', 'a.bankname',
				'bankiban', 'a.bankiban',
				'bankswift', 'a.bankswift',
				'templname', 'a.templname',
				'templersteller', 'a.templersteller',
				'templwebsite', 'a.templwebsite',
				'linkdatenschutz', 'a.linkdatenschutz',
				'copyfooter', 'a.copyfooter',
				'werbungfooter', 'a.werbungfooter',
				'frei1', 'a.frei1',
				'frei2', 'a.frei2',
				'frei3', 'a.frei3',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   Elements order
	 * @param   string  $direction  Order direction
	 *
	 * @return void
	 *
	 * @throws Exception
	 *
	 * @since    1.6
	 */
	protected function populateState($ordering = null, $direction = null)
	{
		// Initialise variables.
		$app = JFactory::getApplication();

		// List state information
		$limit = $app->getUserStateFromRequest('global.list.limit', 'limit', $app->get('list_limit'));
		$this->setState('list.limit', $limit);

		$limitstart = $app->getUserStateFromRequest('limitstart', 'limitstart', 0);
		$this->setState('list.start', $limitstart);

		if ($list = $app->getUserStateFromRequest($this->context . '.list', 'list', array(), 'array'))
		{
			foreach ($list as $name => $value)
			{
				// Extra validations
				switch ($name)
				{
					case 'fullordering':
						$orderingParts = explode(' ', $value);

						if (count($orderingParts) >= 2)
						{
							// Latest part will be considered the direction
							$fullDirection = end($orderingParts);

							if (in_array(strtoupper($fullDirection), array('ASC', 'DESC', '')))
							{
								$this->setState('list.direction', $fullDirection);
							}

							unset($orderingParts[count($orderingParts) - 1]);

							// The rest will be the ordering
							$fullOrdering = implode(' ', $orderingParts);

							if (in_array($fullOrdering, $this->filter_fields))
							{
								$this->setState('list.ordering', $fullOrdering);
							}
						}
						else
						{
							$this->setState('list.ordering', $ordering);
							$this->setState('list.direction', $direction);
						}
						break;

					case 'ordering':
						if (!in_array($value, $this->filter_fields))
						{
							$value = $ordering;
						}
						break;

					case 'direction':
						if (!in_array(strtoupper($value), array('ASC', 'DESC', '')))
						{
							$value = $direction;
						}
						break;

					case 'limit':
						$limit = $value;
						break;

					// Just to keep the default case
					default:
						$value = $value;
						break;
				}

				$this->setState('list.' . $name, $value);
			}
		}

		// Receive & set filters
		if ($filters = $app->getUserStateFromRequest($this->context . '.filter', 'filter', array(), 'array'))
		{
			foreach ($filters as $name => $value)
			{
				$this->setState('filter.' . $name, $value);
			}
		}

		$ordering = $app->input->get('filter_order');

		if (!empty($ordering))
		{
			$list             = $app->getUserState($this->context . '.list');
			$list['ordering'] = $app->input->get('filter_order');
			$app->setUserState($this->context . '.list', $list);
		}

		$orderingDirection = $app->input->get('filter_order_Dir');

		if (!empty($orderingDirection))
		{
			$list              = $app->getUserState($this->context . '.list');
			$list['direction'] = $app->input->get('filter_order_Dir');
			$app->setUserState($this->context . '.list', $list);
		}

		$list = $app->getUserState($this->context . '.list');

		if (empty($list['ordering']))
{
	$list['ordering'] = 'ordering';
}

if (empty($list['direction']))
{
	$list['direction'] = 'asc';
}

		if (isset($list['ordering']))
		{
			$this->setState('list.ordering', $list['ordering']);
		}

		if (isset($list['direction']))
		{
			$this->setState('list.direction', $list['direction']);
		}
	}

	/**
	 * Build an SQL query to load the list data.
	 *
	 * @return   JDatabaseQuery
	 *
	 * @since    1.6
	 */
	protected function getListQuery()
	{
		// Create a new query object.
		$db    = $this->getDbo();
		$query = $db->getQuery(true);

		// Select the required fields from the table.
		$query
			->select(
				$this->getState(
					'list.select', 'DISTINCT a.*'
				)
			);

		$query->from('`#__mdimpressum_pro` AS a');
		
		// Join over the users for the checked out user.
		$query->select('uc.name AS editor');
		$query->join('LEFT', '#__users AS uc ON uc.id=a.checked_out');

		// Join over the created by field 'created_by'
		$query->join('LEFT', '#__users AS created_by ON created_by.id = a.created_by');
		
		if (!JFactory::getUser()->authorise('core.edit', 'com_mdimpressum_pro'))
		{
			$query->where('a.state = 1');
		}

		// Filter by search in title
		$search = $this->getState('filter.search');

		if (!empty($search))
		{
			if (stripos($search, 'id:') === 0)
			{
				$query->where('a.id = ' . (int) substr($search, 3));
			}
			else
			{
				$search = $db->Quote('%' . $db->escape($search, true) . '%');
			}
		}
		

		// Add the list ordering clause.
		$orderCol  = $this->state->get('list.ordering');
		$orderDirn = $this->state->get('list.direction');

		if ($orderCol && $orderDirn)
		{
			$query->order($db->escape($orderCol . ' ' . $orderDirn));
		}

		return $query;
	}

	/**
	 * Method to get an array of data items
	 *
	 * @return  mixed An array of data on success, false on failure.
	 */
	public function getItems()
	{
		$items = parent::getItems();
		

		return $items;
	}

	/**
	 * Overrides the default function to check Date fields format, identified by
	 * "_dateformat" suffix, and erases the field if it's not correct.
	 *
	 * @return void
	 */
	protected function loadFormData()
	{
		$app              = JFactory::getApplication();
		$filters          = $app->getUserState($this->context . '.filter', array());
		$error_dateformat = false;

		foreach ($filters as $key => $value)
		{
			if (strpos($key, '_dateformat') && !empty($value) && $this->isValidDate($value) == null)
			{
				$filters[$key]    = '';
				$error_dateformat = true;
			}
		}

		if ($error_dateformat)
		{
			$app->enqueueMessage(JText::_("COM_MDIMPRESSUM_PRO_SEARCH_FILTER_DATE_FORMAT"), "warning");
			$app->setUserState($this->context . '.filter', $filters);
		}

		return parent::loadFormData();
	}

	/**
	 * Checks if a given date is valid and in a specified format (YYYY-MM-DD)
	 *
	 * @param   string  $date  Date to be checked
	 *
	 * @return bool
	 */
	private function isValidDate($date)
	{
		$date = str_replace('/', '-', $date);
		return (date_create($date)) ? JFactory::getDate($date)->format("Y-m-d") : null;
	}
}
