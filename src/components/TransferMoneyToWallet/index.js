import React, { useEffect, useState } from 'react';
import { getRepos } from '../../services/githubService';
import Loader from '../Loader';
import Modal from '../Modal';
import './index.css';

/**
 * Top Repos List
 *
 * @description: Shows the list of Top Repos for a Github User
 * @returns Bootstrap List Group of Top Repos
 */
function TransferMoneyToWallet() {
  const [searchTerm, setSearchTerm] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    text: '',
    searchTerm,
  });

  useEffect(() => {
    window.addEventListener('getSearchTerm', (event) => {
      setSearchTerm(event.detail);
    });
    return () => {
      window.removeEventListener('getSearchTerm');
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      setRepos([])
      setLoading(true);
      getRepos(searchTerm).then((data) => {
        setLoading(false);
        if (data.status === 404) {
          setRepos([]);
          setShowModal({
            show: true,
            text: 'No Repositories found for ',
            searchTerm,
          });
        } else if(data.status === 401) {
          setRepos([]);
          const event = new CustomEvent('JWT_EXPIRED', {
            detail: true,
          });
          window.dispatchEvent(event);
        }
        else if (data.length === 0) {
          setRepos([]);
          setShowModal({
            show: true,
            text: 'No Repositories found for ',
            searchTerm,
          });
        } else {
          setRepos(data);
          setShowModal({ show: false, text: '', searchTerm: '' });
        }
      });
    } else {
      setRepos([]);
      setLoading(false);
    }
  }, [searchTerm]);

  return (
    <div className="card p-5 mt-4">
      <Modal
        show={repos.length === 0 && showModal.show}
        setShowModal={setShowModal}
        text={showModal.text}
        searchTerm={searchTerm}
      />
      <h3 className="card-header">Top Repositories</h3>
      <ul className="list-group list-group-flush">
        {loading && <Loader />}
        {repos.length > 0 &&
                    repos.map(({ id, name, html_url }) => (
                      <li className="list-group-item" key={id}>
                        <i className="fa fa-caret-right"></i>
                        <a href={html_url} target="_blank" rel="noreferrer">
                          {name}
                        </a>
                      </li>
                    ))}
      </ul>
    </div>
  );
}

export default TransferMoneyToWallet;
