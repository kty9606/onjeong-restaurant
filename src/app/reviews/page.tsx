'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, MessageSquarePlus, Trash2, ShieldAlert, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Review } from '@/lib/supabase';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [nickname, setNickname] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [pin, setPin] = useState('');

  // Delete Modal State
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deletePin, setDeletePin] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Sort State
  const [sortBy, setSortBy] = useState<'latest' | 'highest'>('latest');

  // Fetch reviews
  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (res.ok && data.reviews) {
        setReviews(data.reviews);
      } else {
        setErrorMessage(data.error || '후기를 불러오지 못했습니다.');
      }
    } catch {
      setErrorMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!nickname.trim()) {
      setErrorMessage('닉네임을 입력해주세요.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 2) {
      setErrorMessage('후기 내용을 2자 이상 입력해주세요.');
      return;
    }
    if (!pin.trim() || pin.trim().length < 4) {
      setErrorMessage('삭제용 4자리 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname,
          rating,
          comment,
          pin,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '후기 등록에 실패했습니다.');
      }

      setSuccessMessage('따뜻한 후기가 등록되었습니다. 감사합니다!');
      setNickname('');
      setComment('');
      setPin('');
      setRating(5);
      loadReviews();

      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '오류가 발생했습니다.';
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete
  const handleDeleteConfirm = async () => {
    if (!deleteTargetId || !deletePin.trim()) {
      setDeleteError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      setDeleting(true);
      setDeleteError('');
      const res = await fetch(`/api/reviews?id=${deleteTargetId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: deletePin }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '삭제하지 못했습니다.');
      }

      // Close modal and reload
      setDeleteTargetId(null);
      setDeletePin('');
      loadReviews();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '오류가 발생했습니다.';
      setDeleteError(msg);
    } finally {
      setDeleting(false);
    }
  };

  // Calculations
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'highest') {
      return b.rating - a.rating;
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#8c5a3c] uppercase">
            Guest Reviews
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2b241f]">
            손님들이 전하는 온정의 이야기
          </h1>
          <div className="w-12 h-0.5 bg-[#8c5a3c] mx-auto my-3" />
          <p className="text-sm text-[#73665c]">
            온정에서 함께하신 소중한 순간과 솔직한 이야기를 들려주세요.
          </p>
        </div>

        {/* Rating Summary Card */}
        <div className="bg-white rounded-3xl border border-[#ede5dc] p-6 sm:p-8 shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="text-center sm:text-left">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#2b241f]">
                {averageRating}
              </span>
              <span className="text-sm text-[#9c8e82] ml-1">/ 5.0</span>
              <div className="flex items-center justify-center sm:justify-start space-x-1 mt-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(Number(averageRating))
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="h-10 w-px bg-[#e8dfd5] hidden sm:block" />
            <div>
              <p className="text-sm font-semibold text-[#2b241f]">방문자 만족도</p>
              <p className="text-xs text-[#73665c] mt-0.5">
                총 <span className="text-[#8c5a3c] font-bold">{reviews.length}</span>개의 진솔한 후기
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#8c5a3c] bg-[#f4ece4] px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span>별도 회원가입 없이 누구나 작성 가능합니다</span>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-3xl border border-[#ede5dc] p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <MessageSquarePlus className="w-5 h-5 text-[#8c5a3c]" />
            <h2 className="font-serif text-xl font-bold text-[#2b241f]">후기 남기기</h2>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center space-x-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#594d46] mb-2">
                음식과 서비스는 어떠셨나요? (별점 선택)
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                    aria-label={`${star}점 선택`}
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm font-bold text-[#8c5a3c] ml-2">{rating}점</span>
              </div>
            </div>

            {/* Nickname & PIN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#594d46] mb-1.5">
                  작성자 닉네임
                </label>
                <input
                  type="text"
                  maxLength={20}
                  placeholder="예: 종로미식가"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dfd2c4] bg-[#faf8f5] text-sm text-[#2b241f] focus:outline-none focus:ring-2 focus:ring-[#8c5a3c] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#594d46] mb-1.5">
                  삭제용 비밀번호 (4자리)
                </label>
                <input
                  type="password"
                  maxLength={10}
                  placeholder="추후 본인 삭제 시 사용"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#dfd2c4] bg-[#faf8f5] text-sm text-[#2b241f] focus:outline-none focus:ring-2 focus:ring-[#8c5a3c] transition-all"
                  required
                />
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-semibold text-[#594d46] mb-1.5">
                후기 내용
              </label>
              <textarea
                rows={4}
                maxLength={500}
                placeholder="맛있게 드신 메뉴나 방문 소감을 자유롭게 남겨주세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#dfd2c4] bg-[#faf8f5] text-sm text-[#2b241f] focus:outline-none focus:ring-2 focus:ring-[#8c5a3c] transition-all resize-none"
                required
              />
              <div className="text-right text-xs text-[#9c8e82] mt-1">
                {comment.length}/500자
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-[#8c5a3c] hover:bg-[#72452b] text-white text-sm font-semibold tracking-wide shadow-md transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>등록 중...</span>
                  </>
                ) : (
                  <span>후기 등록하기</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Reviews List Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl font-bold text-[#2b241f]">
              후기 목록 ({reviews.length})
            </h3>

            {/* Sort Filters */}
            <div className="flex items-center space-x-2 text-xs">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  sortBy === 'latest'
                    ? 'bg-[#8c5a3c] text-white font-medium'
                    : 'bg-white text-[#73665c] border border-[#e8dfd5]'
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortBy('highest')}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  sortBy === 'highest'
                    ? 'bg-[#8c5a3c] text-white font-medium'
                    : 'bg-white text-[#73665c] border border-[#e8dfd5]'
                }`}
              >
                별점 높은순
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-[#8c5a3c] flex flex-col items-center space-y-3">
              <Loader2 className="w-7 h-7 animate-spin" />
              <p className="text-sm text-[#73665c]">후기를 불러오고 있습니다...</p>
            </div>
          ) : sortedReviews.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#ede5dc] p-8 space-y-2">
              <p className="font-serif text-lg text-[#594d46]">아직 등록된 후기가 없습니다.</p>
              <p className="text-xs text-[#9c8e82]">첫 번째 따뜻한 후기의 주인공이 되어주세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedReviews.map((rev) => {
                const dateStr = new Date(rev.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl border border-[#ede5dc] p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm text-[#2b241f]">
                            {rev.nickname}
                          </span>
                          <span className="text-xs text-[#9c8e82]">· {dateStr}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1 text-amber-500">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= rev.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-stone-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => {
                          setDeleteTargetId(rev.id);
                          setDeletePin('');
                          setDeleteError('');
                        }}
                        className="text-stone-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-stone-50 transition-colors"
                        title="후기 삭제"
                        aria-label="후기 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-[#453a33] leading-relaxed whitespace-pre-wrap">
                      {rev.comment}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-[#ede5dc] space-y-4 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#2b241f]">후기 삭제</h4>
              <p className="text-xs text-[#73665c]">
                작성 시 설정하셨던 비밀번호를 입력해주세요.
              </p>
            </div>

            {deleteError && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl text-center font-medium">
                {deleteError}
              </p>
            )}

            <div>
              <input
                type="password"
                placeholder="4자리 비밀번호"
                value={deletePin}
                onChange={(e) => setDeletePin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#dfd2c4] text-sm text-center tracking-widest text-[#2b241f] focus:outline-none focus:ring-2 focus:ring-[#8c5a3c]"
                autoFocus
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setDeleteTargetId(null);
                  setDeletePin('');
                  setDeleteError('');
                }}
                className="w-1/2 py-2.5 rounded-full text-xs font-semibold text-[#594d46] bg-[#f4ece4] hover:bg-[#ede2d6] transition-colors"
              >
                취소
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteConfirm}
                className="w-1/2 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors disabled:opacity-50"
              >
                {deleting ? '확인 중...' : '삭제하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
