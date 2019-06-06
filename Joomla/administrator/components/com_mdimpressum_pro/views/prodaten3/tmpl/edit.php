<?php
/**
 * @version    CVS: 4.2.2
 * @package    Com_Mdimpressum_pro
 * @author     Axel Metz <office@megrodesign.com>
 * @copyright  Copyright (C) 2016. Alle Rechte vorbehalten.
 * @license    GNU General Public License Version 2 oder später; siehe LICENSE.txt
 */
// No direct access
defined('_JEXEC') or die;

JHtml::addIncludePath(JPATH_COMPONENT . '/helpers/html');
JHtml::_('behavior.tooltip');
JHtml::_('behavior.formvalidation');
JHtml::_('formbehavior.chosen', 'select');
JHtml::_('behavior.keepalive');

// Import CSS
$document = JFactory::getDocument();
$document->addStyleSheet(JUri::root() . 'media/com_mdimpressum_pro/css/form.css');
?>
<script type="text/javascript">
	js = jQuery.noConflict();
	js(document).ready(function () {
		
	});

	Joomla.submitbutton = function (task) {
		if (task == 'prodaten3.cancel') {
			Joomla.submitform(task, document.getElementById('prodaten3-form'));
		}
		else {
			
			if (task != 'prodaten3.cancel' && document.formvalidator.isValid(document.id('prodaten3-form'))) {
				
				Joomla.submitform(task, document.getElementById('prodaten3-form'));
			}
			else {
				alert('<?php echo $this->escape(JText::_('JGLOBAL_VALIDATION_FORM_FAILED')); ?>');
			}
		}
	}
</script>

<form
	action="<?php echo JRoute::_('index.php?option=com_mdimpressum_pro&layout=edit&id=' . (int) $this->item->id); ?>"
	method="post" enctype="multipart/form-data" name="adminForm" id="prodaten3-form" class="form-validate">

	<div class="form-horizontal">
		<?php echo JHtml::_('bootstrap.startTabSet', 'myTab', array('active' => 'general')); ?>

		<?php echo JHtml::_('bootstrap.addTab', 'myTab', 'general', JText::_('COM_MDIMPRESSUM_PRO_TITLE_PRODATEN3', true)); ?>
		<div class="row-fluid">
			<div class="span10 form-horizontal">
				<fieldset class="adminform">

									<input type="hidden" name="jform[id]" value="<?php echo $this->item->id; ?>" />
				<input type="hidden" name="jform[ordering]" value="<?php echo $this->item->ordering; ?>" />
				<input type="hidden" name="jform[state]" value="<?php echo $this->item->state; ?>" />
				<input type="hidden" name="jform[checked_out]" value="<?php echo $this->item->checked_out; ?>" />
				<input type="hidden" name="jform[checked_out_time]" value="<?php echo $this->item->checked_out_time; ?>" />

				<?php if(empty($this->item->created_by)){ ?>
					<input type="hidden" name="jform[created_by]" value="<?php echo JFactory::getUser()->id; ?>" />

				<?php } 
				else{ ?>
					<input type="hidden" name="jform[created_by]" value="<?php echo $this->item->created_by; ?>" />

				<?php } ?>
				<?php if(empty($this->item->modified_by)){ ?>
					<input type="hidden" name="jform[modified_by]" value="<?php echo JFactory::getUser()->id; ?>" />

				<?php } 
				else{ ?>
					<input type="hidden" name="jform[modified_by]" value="<?php echo $this->item->modified_by; ?>" />

				<?php } ?>			<div class="control-group">
				<div class="control-label"><?php echo $this->form->getLabel('uberschrift3'); ?></div>
				<div class="controls"><?php echo $this->form->getInput('uberschrift3'); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php echo $this->form->getLabel('cookies'); ?></div>
				<div class="controls"><?php echo $this->form->getInput('cookies'); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php echo $this->form->getLabel('serverlog'); ?></div>
				<div class="controls"><?php echo $this->form->getInput('serverlog'); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php echo $this->form->getLabel('kontform'); ?></div>
				<div class="controls"><?php echo $this->escape(JText::_('ONLY_IN_PRO_VERSION')); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php echo $this->form->getLabel('werbemails'); ?></div>
				<div class="controls"><?php echo $this->escape(JText::_('ONLY_IN_PRO_VERSION')); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php echo $this->form->getLabel('newsletterdaten'); ?></div>
				<div class="controls"><?php echo $this->escape(JText::_('ONLY_IN_PRO_VERSION')); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php echo $this->form->getLabel('reg'); ?></div>
				<div class="controls"><?php echo $this->escape(JText::_('ONLY_IN_PRO_VERSION')); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php echo $this->form->getLabel('verarbdaten'); ?></div>
				<div class="controls"><?php echo $this->escape(JText::_('ONLY_IN_PRO_VERSION')); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php //echo $this->form->getLabel('zusatz1'); ?></div>
				<div class="controls"><?php //echo $this->form->getInput('zusatz1'); ?></div>
			</div>
			<div class="control-group">
				<div class="control-label"><?php //echo $this->form->getLabel('zusatz2'); ?></div>
				<div class="controls"><?php //echo $this->form->getInput('zusatz2'); ?></div>
			</div>


					<?php if ($this->state->params->get('save_history', 1)) : ?>
					<div class="control-group">
						<div class="control-label"><?php echo $this->form->getLabel('version_note'); ?></div>
						<div class="controls"><?php echo $this->form->getInput('version_note'); ?></div>
					</div>
					<?php endif; ?>
				</fieldset>
			</div>
		</div>
		<?php echo JHtml::_('bootstrap.endTab'); ?>

		

		<?php echo JHtml::_('bootstrap.endTabSet'); ?>

		<input type="hidden" name="task" value=""/>
		<?php echo JHtml::_('form.token'); ?>

	</div>
</form>
