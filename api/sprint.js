"use strict";

module.exports = AgileSprintClient;

/**
 * Used to access Jira REST endpoints in '/rest/agile/1.0/sprint'
 * @param {JiraClient} jiraClient
 * @constructor AgileSprintClient
 */
function AgileSprintClient(jiraClient) {
  this.jiraClient = jiraClient;

  /**
   * Creates a sprint from a JSON representation.
   *
   * @method createSprint
   * @memberOf AgileSprintClient#
   * @param {object} opts The request options sent to the Jira API.
   * @param {Object} opts.data The sprint data in the form of POST body to the
   *   Jira API.
   * @param [callback] Called when the sprint has been created.
   * @return {Promise} Resolved when the sprint has been created.
   */
  this.createSprint = function (opts,callback) {
    let result = this.jiraClient.parseOptions(opts);

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint'),
      method: 'POST',
      followAllRedirects: true,
			suppliedOptions: result.suppliedOptions,
      json: true,
      body: result.body
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Get a single sprint.
   *
   * @method getSprint
   * @memberOf AgileSprintClient#
   * @param {object} opts The request options sent to the Jira API.
   * @param opts.sprintId The sprint id.
   * @param [callback] Called when the sprint has been retrieved.
   * @return {Promise} Resolved when the sprint has been retrieved.
   */
  this.getSprint = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId),
      method: 'GET',
      json: true,
      followAllRedirects: true,
			suppliedOptions: opts,
      qs: {
        filter: opts.filter,
        startAt: opts.startAt,
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Perform a full update of a sprint.
   *
   * @method updateSprint
   * @memberOf AgileSprintClient#
   * @param {object} opts The request options sent to the Jira API.
   * @param {Object} opts.data The sprint data in the form of PUT body to the
   *   Jira API.
   * @param {string} [opts.data.sprintId] The id of the sprint.  EX: 331
   * @param [callback] Called when the sprint has been updated.
   * @return {Promise} Resolved when the sprint has been updated.
   */
  this.updateSprint = function (opts, callback) {

    let result = this.jiraClient.parseOptions(opts,'sprint');

    var sprintId = result.body.sprintId;
    delete result.body.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + sprintId),
      method: 'PUT',
      followAllRedirects: true,
      json: true,
			suppliedOptions: result.suppliedOptions,
      body: result.body
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Perform a partial update of a sprint.
   *
   * @method partiallyUpdateSprint
   * @memberOf AgileSprintClient#
   * @param {object} opts The request options sent to the Jira API.
   * @param {Object} opts.data The sprint data in the form of POST body to the
   *   Jira API.
   * @param {string} [opts.data.sprintId] The id of the sprint.  EX: 331.
   * @param callback Called when the sprint has been updated.
   * @return {Promise} Resolved when the sprint has been updated.
   */
  this.partiallyUpdateSprint = function (opts, callback) {
    let result = this.jiraClient.parseOptions(opts,'sprint');

    var sprintId = result.body.sprintId;
    delete result.body.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + sprintId),
      method: 'POST',
      followAllRedirects: true,
      json: true,
			suppliedOptions: result.suppliedOptions,
      body: result.body
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Delete an existing sprint.
   *
   * @method deleteSprint
   * @memberOf AgileSprintClient#
   * @param {Object} opts The request options sent to the Jira API.
   * @param {string} opts.sprintId The id of the sprint.  EX: 331
   * @param [callback] Called when the sprint is deleted.
   * @return {Promise} Resolved when the sprint is deleted.
   */
  this.deleteSprint = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId),
      method: 'DELETE',
      json: true,
      followAllRedirects: true,
			suppliedOptions: opts,
      qs: {
        filter: opts.filter,
        startAt: opts.startAt,
        maxResults: opts.maxResults
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Return all issues in a sprint, for a given sprint id.
   *
   * @method getSprintIssues
   * @memberOf AgileSprintClient#
   * @param {Object} opts The request options sent to the Jira API.
   * @param opts.sprintId The sprint id.
   * @param {string} jql Filters results using a JQL query.
   * @param {boolean} validateQuery Specifies whether to valide the JQL query.
   * @param {string} fields The list of fields to return for each issue.
   * @param {string} expand A comma-separated list of the parameters to expand.
   * @param [callback] Called when the issues are returned.
   * @return {Promise} Resolved when the issues are returned.
   */
  this.getSprintIssues = function (opts, callback) {
    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + opts.sprintId + '/issue'),
      method: 'GET',
      json: true,
      followAllRedirects: true,
			suppliedOptions: opts,
      qs: {
        startAt: opts.startAt,
        maxResults: opts.maxResults,
        jql: opts.jql,
        validateQuery: opts.validateQuery,
        fields: opts.fields,
        expand: opts.expand
      }
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Move issues to a sprint, for a given sprint id.
   *
   * @method moveSprintIssues
   * @memberOf AgileSprintClient#
   * @param {Object} opts The issue data in the form of POST body to the
   *   Jira API.
   * @param {string} [opts.sprintId] The sprint id.
   * @param [callback] Called when the sprint has been retrieved.
   * @return {Promise} Resolved when the sprint has been retrieved.
   */
  this.moveSprintIssues = function (opts, callback) {
    var sprintId = opts.sprintId;
    delete opts.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + sprintId + '/issue'),
      method: 'POST',
      followAllRedirects: true,
			suppliedOptions: opts,
      json: true,
      body: opts
    };

    return this.jiraClient.makeRequest(options, callback);
  };

  /**
   * Swap the position of the sprint (given by sprint id) with the second
   * sprint.
   *
   * @method swapSprint
   * @memberOf AgileSprintClient#
   * @param {Object} swapped The data in the form of POST body to the Jira API.
   * @param {string} [swapped.sprintId] The id of the sprint.  EX: 311
   * @param [callback] Called when the sprint has been retrived.
   * @return {Promise} Resolved when the sprint has been retrived.
   */
  this.swapSprint = function (opts, callback) {
    let result = this.jiraClient.parseOptions(opts,'swapped');

    var sprintId = result.body.sprintId;
    delete result.body.sprintId;

    var options = {
      uri: this.jiraClient.buildAgileURL('/sprint/' + sprintId + '/swap'),
      method: 'POST',
      followAllRedirects: true,
			suppliedOptions: result.suppliedOptions,
      json: true,
      body: result.body
    };

    return this.jiraClient.makeRequest(options, callback);
  };

}
